import * as firebase from 'firebase';
import db from '../config/Firebase';
import { orderBy, } from 'lodash'


export const updateEmail = (input) => {
	return {type:'UPDATE_EMAIL', payload: input}
}
export const updatePassword = (input) => {
	return {type:'UPDATE_PASSWORD', payload: input}
}

export const updateUsername = (input) => {
	return {type:'UPDATE_USERNAME', payload: input}
}

export const updatePhoto = (input) => {
	return {type:'UPDATE_PHOTO', payload: input}
}
export const updateQuote = (input) => {
	return {type: 'UPDATE_QUOTE', payload: input}
}
export const updateName = (name) => {
	return {type: 'UPDATE_NAME', payload: name}
}


export const signup = () =>{
	return async (dispatch, getState) => {
		try{
			const { username, email, password, photo } = getState().user
			const response = await firebase.auth().createUserWithEmailAndPassword(email,password)

			if(response.user.uid){
				// alert('signup up')
				const user = {
					uid: response.user.uid,
					username:username,
					email: email,
					posts: [],
					bio: '',
					likes:0,
					photo: photo,
					savedPosts:[],
					followers:[],
					following:[],
				}
				await db.collection('users').doc(response.user.uid).set(user)
				dispatch({type: 'LOGIN', payload: user})
				alert('User has been signed up!')
			}
		}catch(e){
			alert(e)
		}
	}
}

export const login  = () => {
	return async (dispatch, getState) =>{
		try {
			const { email, password } = getState().user
			const response = await firebase.auth().signInWithEmailAndPassword(email, password)
			dispatch(getUser(response.user.uid)) //retrives the unique id of the user
		}catch(e){
			alert(e)
		}
	}
}

//therefore in the function below we need to get statistics and data from the user with the given unique id

export const getUser = (uid, type) => {
	return async (dispatch) =>{
		try{
			const userQuery = await db.collection('users').doc(uid).get()
			let user = userQuery.data()
	
			let posts = []
			const postsQuery = await db.collection('posts').where('uid', '==', uid).get()
			postsQuery.forEach(function(response){
				posts.push(response.data())
			})
	
			user.posts = orderBy(posts, 'date', 'desc')
	
			if(type == 'PROFILE'){
				dispatch({type:'GET_PROFILE', payload:user})
			}else{
				dispatch({type:'LOGIN', payload:user})
			}
		}catch(e){
			alert(e)
		}
	
	}
}

export const followUser = (userToFollow) => {
	return async (dispatch, getState) => {
		try{
			const { uid } = getState().user

			await db.collection('users').doc(uid).update({
				following: firebase.firestore.FieldValue.arrayUnion(userToFollow)
			})
			await db.collection('users').doc(userToFollow).update({
				followers: firebase.firestore.FieldValue.arrayUnion(uid)
			})
	
			dispatch(getUser(userToFollow, 'PROFILE'))
		}catch(e){
			alert(e)
		}
		

	}
}
export const unFollowUser = (userToFollow) => {
	return async (dispatch, getState) => {
		try{
			
			const { uid } = getState().user

			await db.collection('users').doc(uid).update({
				following: firebase.firestore.FieldValue.arrayRemove(userToFollow)
			})
			await db.collection('users').doc(userToFollow).update({
				followers: firebase.firestore.FieldValue.arrayRemove(uid)
			})
	
			dispatch(getUser(userToFollow, 'PROFILE'))
		}catch(e){
			alert(e)
		}
		
	}
}

export const updateUser = () => {
	return async ( dispatch, getState )  => {
		const { uid, username, quote, photo, backgroundImage } = getState().user
		try {
			db.collection('users').doc(uid).update({
				username: username,
				quote: quote,
				photo: photo,
			})
		} catch(e) {
			alert(e)
		}
	}
}