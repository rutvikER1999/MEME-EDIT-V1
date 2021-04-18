import React from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { updateDescription } from '../../../actions/post'

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class PostCheckout extends React.Component {

    render(){
        return (
            <View style={{flex:1, backgroundColor:'white', alignItems:'center'}}>
            <Image source={require('../../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}} />
                <TextInput 
                placeholderTextColor={'black'}
                placeholder={'Type in your description here :)'}
                onChangeText={input=>this.props.updateDescription(input)}
                value={this.props.post.description}
                style={{backgroundColor:'rgba(0,0,0,0.05)', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, width:'95%', borderRadius:10}}
                />
                
                <View>
                    <ScrollView
                    horizontal={true}
                    pagingEnabled={true} 
                    
                    >
                        {
                        this.props.post.photos?.map(e=>
                            <Image source={{uri: e}} style={{width:screenWidth, height:360, }} />
                        )
                        }

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateDescription }, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
        
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(PostCheckout)







