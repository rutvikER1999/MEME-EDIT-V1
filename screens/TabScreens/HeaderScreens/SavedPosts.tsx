import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../../actions/user'
import { getSavedPosts, likePost, unLikePost, savePost,unSavePost} from '../../../actions/post'

import PostComponent from '../../Components/PostComponent'
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class SavedPosts extends React.Component {

    componentDidMount = () =>{
        this.props.getSavedPosts()
        
    }

    render(){
        
        return (
        
        
            <FlatList
            style={{backgroundColor:'white'}}
            data={this.props.post.saved_feed}
            keyExtractor={(item) => JSON.stringify(item.uid)}
            renderItem={({item}) => (
                <PostComponent 
                item={item}
                user={this.props.user}
                likePost={(item)=>this.props.likePost(item)}
                unLikePost={(item)=>this.props.unLikePost(item)}
                savePost={(item)=>this.props.savePost(item)}
                unSavePost={(item)=>this.props.unSavePost(item)}
                />
            )}
            />
            
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getSavedPosts, likePost, unLikePost, savePost,unSavePost}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(SavedPosts)
