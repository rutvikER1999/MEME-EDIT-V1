import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator'
import PostCheckout from '../screens/TabScreens/Upload/PostCheckout'
import SavedPosts from '../screens/TabScreens/HeaderScreens/SavedPosts'
import ProfileScreen from '../screens/TabScreens/ProfileScreen'
import OnePost from '../screens/TabScreens/OnePost'
import Edit from '../screens/TabScreens/Edit'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { uploadPost } from '../actions/post'



const Stack = createStackNavigator();

class MyStack extends React.Component{
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="TabNavigator" component={TabNavigator}  options={{headerShown: false,}}/>
                <Stack.Screen name="SavedPosts" component={SavedPosts}  />
                <Stack.Screen name="OnePost" component={OnePost}  />
                <Stack.Screen name="Edit" component={Edit}  />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{
                    headerStyle: {backgroundColor:'white'}
                }}/>
                <Stack.Screen name="PostCheckout" component={PostCheckout}  
                options={{
                    headerShown: true, headerTitle:'See your post', 
                    headerRight: () => (
                        <TouchableOpacity style={{margin:20, flexDirection:'row'}}
                        onPress={()=>this.props.uploadPost()}
                        >
                            <Text style={{color:'blue', fontWeight:'bold', fontSize:22, marginHorizontal:5, bottom:0}}>POST</Text>
                            <FontAwesome name='check' color={'blue'} size={25} style={{top:2}} />
                        </TouchableOpacity>
                    ),
            }}/>

            
            </Stack.Navigator>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ uploadPost }, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
        
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(MyStack)