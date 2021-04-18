// import React from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Dimensions, SafeAreaView, Platform, ImagePickerIOS} from 'react-native';
// import * as Permissions from 'expo-permissions';
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { getUser } from '../../actions/user'
// import * as ImagePicker from 'expo-image-picker';
// import { uploadPhoto, } from '../../actions/index'
// import { updateNextPhoto, removeImage } from '../../actions/post'
// import { FontAwesome } from '@expo/vector-icons'


// const screenWidth = Dimensions.get("window").width
// const screenHeight = Dimensions.get("window").height

// class PostScreen extends React.Component {

//     state ={
//         urlChosen:undefined
//     }
//     openLibrary = async () => {
//         try {
//             const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
//             if(status === 'granted') {
//                 const image = await ImagePicker.launchImageLibraryAsync({
//                     allowsEditing:true
//                 })
//                 if(!image.cancelled) {
//                     // const url = await this.props.uploadPhoto(image)
//                     const url = await this.props.uploadPhoto(image)
//                     // this.setState({url:url})
//                     this.props.updateNextPhoto(url)
//                     this.setState({urlChosen:url})
//                 }

//             }
//         } catch (error) {
//             alert(error)
//         }
//     }

//     changeChosenUrl = (url) => {
//         this.setState({urlChosen: url})
//     }

//     removeImage = (url) => {
//         const position = this.props.post.photos.indexOf(url)
//         this.props.removeImage(position)
//         if(this.props.post.photos.length == 2){
//             this.setState({urlChosen: this.props.post.photos[0]})
//         }else{
//             this.setState({urlChosen:undefined})
//         }
//     }

//     uploadPost = () => {
//         this.props.navigation.navigate("PostCheckout")
//     }
//     render(){
//         return (
//             <SafeAreaView style={  {flex:1,}}>
//             <Image source={require('../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight,}} />
//                 <View style={(Platform.OS == 'ios') ?
//                 {width:screenWidth, height:55}
//                 : 
//                 {width:screenWidth, height:55,  marginTop:30, justifyContent:'space-between', alignItems:"center", flexDirection:'row',}
//                 }>
//                     <Text style={{margin:10, fontWeight:'bold', fontSize:22}}>Create a new post</Text>
//                     <TouchableOpacity style={{margin:10}}
//                     onPress={()=> this.uploadPost()}>
//                         <Text style={{margin:10, fontWeight:'bold', fontSize:22, color:'blue'}}>Upload</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={{width:screenWidth, height:360, }}>
//                     {
//                     (this.state.urlChosen == undefined)?
//                     <TouchableOpacity style={{width:screenWidth, height:360, justifyContent:'center',alignItems:'center'}}  
//                     onPress={()=> this.openLibrary()}>
//                         <View style={{width:65, height:65, borderRadius:65/2, backgroundColor:'rgba(0,0,0,0.1)', justifyContent:'center', alignItems:'center'}}>
//                             <Text style={{color:'white', fontSize:40}}>+</Text>
//                         </View>
//                     </TouchableOpacity>
//                     :
//                     <TouchableOpacity
//                     // onPress={alert(this.state.urlChosen)}
//                     style={{width:screenWidth, height:360,}}>
//                         <Image source={{uri: this.state.urlChosen }} style={{width:screenWidth, height:360,}}/>
//                         <TouchableOpacity onPress={()=> this.removeImage(this.state.urlChosen)} style={{position:"absolute", bottom:30, right:40}}>
//                             <FontAwesome name='trash' color={'black'} size={40} />
//                         </TouchableOpacity>
//                     </TouchableOpacity>

//                     }
//                 </View>
                
//                 <View style={{flexDirection:'row', width:screenWidth, justifyContent:'center',alignItems:'center', flex:1}}>
//                     {
//                         (this.props.post.photos == undefined || this.props.post.photos?.length == 3  || this.props.post.photos?.length == 0)
//                         ?
//                         null
//                         :
//                         <TouchableOpacity style={{width:95, height:90, backgroundColor:'rgba(0,0,0,0.1)', justifyContent:'center', alignItems:'center', borderRadius:12, margin:10 }}
//                         onPress={()=> this.openLibrary()}>
//                             <View style={{width:40, height:40, borderRadius:20, backgroundColor:'rgba(0,0,0,0.1)', justifyContent:'center', alignItems:'center'}}>
//                                 <Text style={{color:'white', fontSize:30}}>+</Text>
//                             </View>
//                         </TouchableOpacity>
//                     }
//                     {
//                         this.props.post.photos?.map(e=>
//                             <TouchableOpacity
//                             onPress={()=> this.changeChosenUrl(e)}>
//                                 <Image source={{uri: e}} style={{width:95, height:90, backgroundColor:'rgba(0,0,0,0.1)', borderRadius:12, margin:10}} />
//                             </TouchableOpacity>
//                         )
//                     }
//                 </View>
//             </SafeAreaView>
//         );
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({ getUser, uploadPhoto, updateNextPhoto, removeImage}, dispatch)
// }
// const mapStateToProps = (state) => {
//     return{
//         user: state.user,
//         post: state.post
//     }
// }


// export default connect (mapStateToProps, mapDispatchToProps)(PostScreen)




import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {PESDK, Configuration, TintMode, SerializationExportType} from 'react-native-photoeditorsdk';

const options={
  title: 'my pic app',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
}
let serialization=null;
export default class PostScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      avatarSource: null,
      pic:null,
      imagedata:""
    }
  }

  openEditor = () => {
    // Set up sample image
    let image = this.state.imagedata
    console.log(image)
    // Set up configuration
    let configuration: Configuration = {
      // Configure sticker tool
      sticker: {
        // Enable personal stickers
        personalStickers: true,
        // Configure stickers
        categories: [
          // Create sticker category with stickers
          {
            identifier: 'example_sticker_category_logos',
            name: 'Logos',
            thumbnailURI: require('../../assets/React-Logo.png'),
            items: [
              {
                identifier: 'example_sticker_logos_react',
                name: 'React',
                stickerURI: require('../../assets/React-Logo.png'),
              },
              {
                identifier: 'example_sticker_logos_imgly',
                name: 'img.ly',
                stickerURI: require('../../assets/imgly-Logo.png'),
                tintMode: TintMode.SOLID,
              },
            ],
          },
          // Use existing sticker category
          {identifier: 'imgly_sticker_category_emoticons'},
          // Modify existing sticker category
          {
            identifier: 'imgly_sticker_category_shapes',
            items: [
              {identifier: 'imgly_sticker_shapes_badge_01'},
              {identifier: 'imgly_sticker_shapes_arrow_02'},
              {identifier: 'imgly_sticker_shapes_spray_03'},
            ],
          },
        ],
      },
      export:{
        serialization :{
          enabled:true,
          exportType:SerializationExportType.OBJECT
        }
      }
    };
    PESDK.openEditor(image, configuration,serialization).then(result=>{
      if(result!=null)
      {
        serialization=result.serialization; 
      }
    });
};


myfun=()=>{
  // alert('clicked');

  ImagePicker.launchImageLibrary(options, (response) => {
    console.log('Response = ', response);
    console.log(response.fileName)
    console.log(response.data)
    console.log(response.uri)

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('Image Picker Error: ', response.error);
    }

    else {
      let source = { uri: response.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        avatarSource: source,
        pic:response.data,
        imagedata:response.uri
      });
    }
    
  });
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>

          <Image source={this.state.avatarSource}
          style={{width:'100%',height:300,margin:10}}/>

        <TouchableOpacity style={{backgroundColor:'green',margin:10,padding:10}}
        onPress={this.myfun}>
          <Text style={{color:'#fff'}}>Select Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.uploadPic}>
          <Text>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.openEditor}>
          <Text>
            ***************** Click here to <Text>edit a sample image</Text>.
          </Text>
        </TouchableOpacity>


      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


