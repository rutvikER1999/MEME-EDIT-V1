import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image,FlatList} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { getPosts } from '../../actions/post'
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class NotificationsScreen extends React.Component {
    componentDidMount = () =>{
        this.props.getPosts()
    }
    render(){
        return (
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
            <Image source={require('../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}} />
                <FlatList
                numColumns={3} 
                data={this.props.post.feed}
                keyExtractor={(item) => JSON.stringify(item.uid)}
                renderItem={({item}) => (
                    <TouchableOpacity >
                        <Image source={{uri:item.photos[0]}} style={{width:screenWidth/3, height:screenWidth/3,margin:0 } }/>
                    </TouchableOpacity>
                )}
                />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getPosts}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(NotificationsScreen)







