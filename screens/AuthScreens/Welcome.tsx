import { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';
import * as firebase from 'firebase';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'

class Login extends React.Component {

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.props.getUser(user.uid)
                if(this.props.user != null){
                    this.props.navigation.navigate('StackNavigator')
                    this.props.navigation.reset({ 
                        index:0,
                        routes: [{ name: 'StackNavigator'}]
                    })
                }
            }
            else {
                this.props.navigation.navigate('Login')
            }
        })
    }


    render(){
        return (
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:35, fontFamily:'logo-font', marginVertical:60, color:'#0095f6'}}>Notaninstaclone</Text>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(Login)







