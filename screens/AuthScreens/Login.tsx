import { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword , login} from '../../actions/user'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class Login extends React.Component {

  render(){
        return (
            <View style={{   flex: 1,   alignItems: 'center',}}>
              {/* <Image source={require('../../assets/backgrounds/back4.jpeg')} style={{   position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50}} /> */}
              <Image source={require('../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}} />

              <Text style={{fontSize:35, fontFamily:'logo-font', marginVertical:60, color:'#0095f6',marginTop:100,marginBottom:10}}>MEMEDIT</Text>
              

              <View style={{marginTop:100}}>
                <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                  <Text style={{left:15}}>Email</Text>
                </View>
                <TextInput 
                style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                placeholderTextColor={'grey'}
                placeholder={'example@example.com'}
                // value={this.props.user.email}
                // onChangeText={input=>this.props.updateEmail(input)}
                onChangeText={input=>this.props.updateEmail(input)}
                value={this.props.user.email}
                />
                <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                  <Text style={{left:15}}>Password</Text>
                </View>
                <TextInput 
                style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                placeholderTextColor={'grey'}
                placeholder={'Passcode123'}
                // value={this.props.user.password}
                onChangeText={input=>this.props.updatePassword(input)}
                value={this.props.user.password}

                // onChangeText={input=>this.props.updatePassword(input)}
                secureTextEntry={true}

                />
                
                  
              </View>
              <View style={{width:screenWidth, justifyContent:'center',alignItems:'center', margin:30}}>
                  <TouchableOpacity style={{width:screenWidth*0.6, height:50, borderRadius:30, backgroundColor:'#0095f6', justifyContent:'center',alignItems:'center'}}
                  onPress={()=> this.props.login()}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>LOGIN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{alignItems:'center', flexDirection:'row', margin:10}}
                  onPress={()=> this.props.navigation.navigate('ProfilePicture')}>
                    <Text style={{fontSize:18}}>Don't have an account? </Text>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0095f6'}}>Signup!</Text>
                  </TouchableOpacity>
                  {/* <View style={{position:'absolute', top:250, justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18}}>from</Text>
                    <Text style={{fontSize:20, fontWeight:'bold'}}> Antoni</Text>
                  </View> */}
              </View>
              
              
              
              
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword , login}, dispatch)
}
const mapStateToProps = (state) => {
  return{
    user: state.user,
  }
}


export default connect (mapStateToProps, mapDispatchToProps)(Login)







