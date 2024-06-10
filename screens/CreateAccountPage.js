import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import Color from "../constants/Color";
import { useNavigation } from "@react-navigation/native";
import OrSeparator from "../components/OrSeparator";
import IconButton from "../components/IconButton";
import { Button } from "react-native";

function CreateAccountPage() {
    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
           <View style={styles.logoContainer}>
                <Image style={styles.imageStyle}  source={require('../assets/logo.png')} />
                <Text style={styles.titleStyle}>Create An Account </Text>
           </View>
           <View style={styles.buttonContainer}>
           <IconButton iconColor="white" textColor="white" iconName='mail-outline' color={Color.primary_color} iconText='Continue with mail' onPress={() => navigation.navigate('setup')}  />
           <IconButton iconColor="white" textColor="white" iconName='logo-apple' color={Color.tertiary_color} iconText='Continue with apple' />
            <OrSeparator />
            <IconButton iconColor={Color.tertiary_color} textColor={Color.tertiary_color} iconName='logo-google' color={Color.primary_color_tint} iconText='Continue with google' />
            <TouchableOpacity style={{alignSelf:'center', margin:6}} onPress={() => navigation.navigate('login')}>
                <Text style={{padding:8, fontSize:12, fontWeight:'400', color:Color.primary_color}}>Have an account? Sign In</Text>
            </TouchableOpacity>
           </View>
        
        </View>
    )

}


const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: Color.background_color,
        justifyContent:'center',
        
    },
    logoContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop: 40
    },
    imageStyle:{
        width:100,
        height:100
    },
    titleStyle:{
        fontWeight:'medium',
        fontSize: 25
    },
    metaText:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'200'
    },
    welcomeImageContainer:{
        alignItems:'center'
    },
    welcomImageStyle: {
        height:300,
        width: 200
    },
    buttonContainer:{
        justifyContent:'center',
        alignItems:'center'
    }
})

export default CreateAccountPage
