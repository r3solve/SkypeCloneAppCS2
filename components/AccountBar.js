import {View, Text,StyleSheet,Image, TouchableOpacity} from 'react-native'
import Color from '../constants/Color'


const AccountBar  = props => {
    return (
        <View style={styles.appContainer}>
            <TouchableOpacity onPress={props.onPress} >
            <View style={styles.chatContainer} >
            <Image style={styles.imageContainer} source={require('../assets/profile.jpg')} ></Image>
                <View style={styles.textContainer} >
                    <Text style={{fontWeight:'light', paddingHorizontal: 2, paddingVertical:1, fontSize:14}}>{props.user}</Text>
                    <Text style={{padding:4, fontSize:12, color:'#837f7f'}} >{props.children}</Text>
                </View>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        flex:1,
        marginVertical:4
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
        padding:2, 
        marginHorizontal:8       
    }
})

export default AccountBar