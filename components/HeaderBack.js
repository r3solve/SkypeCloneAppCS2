import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { View, Image } from 'react-native'

function HeaderBack(props) {
  return (
    <View style={{flexDirection:'row'}}>
        <Ionicons onPress={props.onPress} size={25} name='arrow-back'></Ionicons>
        <Avatar.Image size={40} source={require('../assets/profile.jpg')} />
    </View>
  )
}

export default HeaderBack
