import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser , followUser, unFollowUser} from '../../actions/user'
import { getPost } from '../../actions/post'
import * as firebase from 'firebase';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class ProfileScreen extends React.Component {

    componentDidMount = () => {
        const { params } = this.props.route
        if (params !==undefined){
            this.props.getUser(params, 'PROFILE')
        }
    }

    follow = () => {
        this.props.followUser(this.props.profile.uid)
    }
    unFollow = () => {
        this.props.unFollowUser(this.props.profile.uid)
    }

    goToPost = (post) => {
        this.props.getPost(post)
        this.props.navigation.navigate('OnePost')
    }

    render(){
        const { params } = this.props.route
        this.props.navigation.setOptions({
            title: this.props.profile?.username
        })

        if(params == undefined || params == this.props.user.uid){
            return (
                <ScrollView style={{flex:1, backgroundColor:'white', height:screenHeight}}>

                    <SafeAreaView style={{flex:1}}>
                        
                        <View style={{width:'100%', height:120, flexDirection:'row', justifyContent:'space-between',alignItems:'center', backgroundColor:'white'}}>
                            <Image source={{uri:this.props.user?.photo}} style={{width:90, height:90, borderRadius:45, margin:20}}/>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <View style={{justifyContent:'center',alignItems:'center', margin:20}}>
                                    <Text style={{fontSize:20, fontWeight:'bold'}}>
                                        {this.props.user?.posts?.length}
                                    </Text>
                                    <Text style={{fontSize:15}}>
                                        Posts
                                    </Text>
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center', margin:20}}>
                                    <Text style={{fontSize:20, fontWeight:'bold'}}>
                                        {this.props.user?.followers?.length}
                                    </Text>
                                    <Text style={{fontSize:15}}>
                                        Followers
                                    </Text> 
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center', margin:20}}>
                                    <Text style={{fontSize:20, fontWeight:'bold'}}>
                                        {this.props.user?.following?.length}
                                    </Text>
                                    <Text style={{fontSize:15}}>
                                        Following
                                    </Text> 
                                </View>
                            </View>
                        </View>
                        <View style={{paddingHorizontal:20, width:'100%',marginBottom:20}}>
                            <Text style={{fontWeight:"bold", fontSize:16}}>{this.props.user?.email}</Text>
                            <Text>{this.props.user?.bio}</Text>
                        </View>
                    
                        <View style={{height:60, width:'100%', flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity 
                            onPress={()=>this.props.navigation.navigate('Edit')}
                            style={{width:'90%', height:35, justifyContent:'center',alignItems:'center', borderRadius:7, borderWidth:1, borderColor:'grey'}} >
                                <Text style={{color:'black', fontSize:19, fontWeight:"bold"}}>Edit profile</Text>
                            </TouchableOpacity>
                        </View>
                        

                        <FlatList 
                        numColumns={3} 
                        data={this.props.user?.posts}
                        keyExtractor={(item) => JSON.stringify(item.date) }
                        style={{flex:1,}}
                        renderItem={({ item })=> 
                            <TouchableOpacity
                            onPress={()=> this.goToPost(item)}>
                                <Image source={{uri: item.photos[0]}}  style={{width:screenWidth/3, height:screenWidth/3}}/>
                            </TouchableOpacity>
                        }
                        />
                        
                        </SafeAreaView>
                    </ScrollView>
            );
        }
        
        
        
        else{
            return (
                <ScrollView style={{flex:1, backgroundColor:'white'}}>
                    <View style={{width:'100%', height:120, flexDirection:'row', justifyContent:'space-between',alignItems:'center', backgroundColor:'white'}}>
                        <Image source={{uri:this.props.profile?.photo}} style={{width:90, height:90, borderRadius:45, margin:20}}/>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{justifyContent:'center',alignItems:'center', margin:20}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>
                                    {this.props.profile?.posts?.length}
                                </Text>
                                <Text style={{fontSize:15}}>
                                    Posts
                                </Text>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center', margin:20}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>
                                    {this.props.profile?.followers?.length}
                                </Text>
                                <Text style={{fontSize:15}}>
                                    Followers
                                </Text> 
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center', margin:20}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>
                                    {this.props.profile?.following?.length}
                                </Text>
                                <Text style={{fontSize:15}}>
                                    Following
                                </Text> 
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:20, width:'100%',marginBottom:20}}>
                        <Text style={{fontWeight:"bold", fontSize:16}}>{this.props.profile?.email}</Text>
                        <Text>{this.props.profile?.bio}</Text>
                    </View>
                    {
                    (this.props.profile?.followers?.includes(this.props.user.uid))?
                        <View style={{height:60, width:'100%', flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity 
                            onPress={()=>this.unFollow()}
                            style={{flexDirection:'row', width:screenWidth*.45, height:35, justifyContent:'center',alignItems:'center', borderWidth:0.5,borderColor:"grey", borderRadius:7, margin:screenWidth*0.0125}}>
                                <Text style={{fontWeight:'bold', fontSize:16, margin:5}}>Following</Text>
                                <Image source={require('../../assets/images/arr-bottom.png')} style={{width:15,height:9}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:screenWidth*.45, height:35, justifyContent:'center',alignItems:'center', borderWidth:0.5,borderColor:"grey", borderRadius:7, margin:screenWidth*0.0125}}>
                                <Text style={{fontWeight:'bold', fontSize:16,}}>Message</Text>
                            </TouchableOpacity>
                        </View>
                    :
                        <View style={{height:60, width:'100%', flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity 
                            onPress={()=>this.follow()}
                            style={{width:'90%', backgroundColor:'#0095f8', height:35, justifyContent:'center',alignItems:'center', borderRadius:7}} >
                                <Text style={{color:'white', fontSize:19, fontWeight:"bold"}}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <FlatList 
                    numColumns={3} 
                    data={this.props.profile?.posts}
                    keyExtractor={(item) => JSON.stringify(item.date) }
                    style={{flex:1,}}
                    renderItem={({ item })=> 
                        <TouchableOpacity
                        onPress={()=> this.goToPost(item)}>
                            <Image source={{uri: item.photos[0]}}  style={{width:screenWidth/3, height:screenWidth/3}}/>
                        </TouchableOpacity>
                    }
                    />
                    

                </ScrollView>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser,  followUser, unFollowUser, getPost}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        profile: state.profile
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(ProfileScreen)







