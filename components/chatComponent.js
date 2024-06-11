import {View, Text, Pressable, StyleSheet,Image} from 'react-native'
import Color from '../constants/Color'
import { Badge } from 'react-native-paper'


const ChatComponent  = props => {
    return (
        <View style={styles.appContainer}>
            <Pressable onPress={props.onPress} >
            <View style={styles.chatContainer} >
            <Image style={styles.imageContainer} source={require('../assets/profile.jpg')} ></Image>
                <View style={styles.textContainer} >
                    <Text style={{fontWeight:'bold', paddingHorizontal: 4, paddingVertical:3}}>{props.user}</Text>
                    <Text> {props.message}</Text>
                </View>
            </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        flex:1,
    },
    chatContainer: {
        flexDirection:'row',
        borderWidth:0.5,
        borderColor:'#e6e2e2',
        backgroundColor:Color.background_color,
        padding: 8,
        borderRadius: 5,
        height: 70
    },
    imageContainer: {
        height:50,
        width:50,
        borderRadius:40,
        padding: 4
        },
    textContainer: {
        justifyContent:'center',
        paddingHorizontal: 8
    }
})

export default ChatComponent