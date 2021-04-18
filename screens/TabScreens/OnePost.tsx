import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { getPosts, likePost, unLikePost, savePost,unSavePost} from '../../actions/post'

import PostComponent from '../Components/PostComponent'
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class HomeScreen extends React.Component {

  

    render(){
        this.props.navigation.setOptions({
            title:this.props.post.onePost.username + "'s post"
        })
        return (
            <PostComponent 
            item={this.props.post.onePost}
            user={this.props.user}
            likePost={(item)=>this.props.likePost(item)}
            unLikePost={(item)=>this.props.unLikePost(item)}
            savePost={(item)=>this.props.savePost(item)}
            unSavePost={(item)=>this.props.unSavePost(item)}
            navigation={this.props.navigation}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getPosts, likePost, unLikePost, savePost,unSavePost}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(HomeScreen)







