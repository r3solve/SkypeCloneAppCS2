import {Text, Pressable, View, StyleSheet} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Color from '../constants/Color';



function CustomButton(props) {
    return (
        <Pressable
            onPress={props.onPress}
            style={({ pressed }) => [
                props.primary && styles.buttonPrimary,
                props.secondary && styles.buttonSecondary,
                pressed && styles.pressed
            ]}

        >

                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Text
                        style={[
                            props.primary && styles.buttonTextPrimary,
                            props.secondary && styles.buttonTextSecondary
                        ]}
                    >
                        {props.title}
                    </Text>
                </View>
            

        </Pressable>
    );
}

export default CustomButton

const styles =  StyleSheet.create( {
    buttonPrimary: {
        borderRadius: 8,
        fontSize: 20,
        width: "85%",
        height: 45,
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
        width: "80%",
        height: 45,
        margin: 12,
        backgroundColor: 'white',
        borderColor: Color.primary_color,
        borderWidth: 1
    },
 
})