import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { View, Image, Text } from 'react-native'
import { StyleSheet } from 'react-native'

function HeaderBack(props) {
  return (
    <View style={styles.container}>
        <Ionicons style={styles.iconBtn}  onPress={props.onPress} size={25} name='arrow-back'></Ionicons>
        <Avatar.Image  style={styles.avatar} size={40} source={require('../assets/profile.jpg')} />
        <Text style={styles.usernameText} >{props.username}</Text>
    </View>
  )
}

const styles = StyleSheet.create( {
    container: {
        flexDirection:'row'
    },
    
    iconBtn: {
        marginTop:6,
        marginLeft:6
    }
    ,
    avatar: {
        marginHorizontal: 12
    },
    usernameText: {
        fontWeight:'400',
        alignSelf:'center'
    }
})

export default HeaderBack
