import {Text, Pressable, View, StyleSheet} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Color from '../constants/Color';



function CustomButton(props) {


    return <Pressable onPress={props.onPress} android_ripple='true' style={[props.primary && styles.buttonPrimary, props.secondary && styles.buttonSecondary]}>
            { !props.iconName &&
                <View style={{justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                    <Text style={[props.primary && styles.buttonTextPrimary, props.secondary && styles.buttonTextSecondary]}>{props.title}</Text>
                </View>
                }

            { props.iconName && <FontAwesome.Button name={props.iconName} backgroundColor={props.color}>
                {props.iconText}
                 </FontAwesome.Button>}
            </Pressable>

}
export default CustomButton

const styles =  StyleSheet.create( {
    buttonPrimary: {
        borderRadius: 8,
        fontSize: 20,
        width: "90%",
        height: 40,
        margin: 12,
        backgroundColor: Color.primary_color,
        color:'white',
        alignSelf: 'center'
    },
     buttonTextPrimary: {
        color:"#f5fafc",
        fontWeight: 600,
        fontSize: 18,
        paddingTop: 8
    },
    buttonTextSecondary : {
        color:Color.primary_color,
        fontWeight: 600,
        paddingTop: 7,
        fontSize:18
        
    },
    buttonSecondary: {
        borderRadius: 8,
        fontSize: 20,
        width: "90%",
        height: 40,
        margin: 12,
        backgroundColor: 'white',
        borderColor: Color.primary_color,
        borderWidth: 1
    },
})