import * as firebase from 'firebase';
import db from '../config/Firebase';
import * as ImageManipulator from 'expo-image-manipulator';
import uuid from "uuid";

export const uploadPhoto = (image) => {
    return async (dispatch) => {
        var metadata = {
            cacheContol: 'public, max-age=5000, s-maxage=600',
        }
        let fileType = image.uri.split("/")
        let length = fileType.length -1
        fileType = fileType[length].split(".")[1]

        const resize = await ImageManipulator.manipulateAsync(image.uri, [], {
            format: ImageManipulator.SaveFormat[fileType === "jpeg" || "jpg" ? "JPEG" : "PNG"],
            compress: 0.5,
            base64:false
        })
        
        const response = await fetch(resize.uri)
        const blob = await response.blob()

        const uploadTask = await firebase
        .storage()
        .ref()
        .child(`images/${uuid.v4()}`)
        .put(blob, metadata)

        const downloadURL = await uploadTask.ref.getDownloadURL()
        return downloadURL

    }
}