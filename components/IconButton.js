import {Text, View, Pressable, StyleSheet} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

function IconButton(props){
    return (
        <TouchableOpacity style={styles.outterButtonView} onPress={props.onPress}>
            <View style={[styles.innerButtonView, {backgroundColor:props.color}]}>
                <Ionicons style={styles.iconContainer} name={props.iconName} size={20} color={props.iconColor} ></Ionicons>
                <Text style={[styles.iconButtonText, {color:props.textColor}]}>{props.iconText}</Text>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    innerButtonView:{
        flexDirection:'row',
        borderRadius:12,
        flex:1
        
    },
    iconButtonText: {
        color:'black',
        marginVertical:15,
        fontSize: 14,
        textAlign:'center',
        fontWeight: 300
        
    },
    outterButtonView:{
        height:50,
        width:"73%",
        margin:8
    },
    iconContainer:{
        alignSelf:'center',
        marginHorizontal:"11%",
    }
})


export default IconButton