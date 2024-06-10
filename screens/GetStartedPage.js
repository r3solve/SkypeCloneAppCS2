import { View, Text, Image, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import Color from "../constants/Color";
import { useNavigation } from "@react-navigation/native";

function GetStartedPage() {
    const navigator = useNavigation()
    return (
        <View style={styles.mainContainer}>
           <View style={styles.logoContainer}>
                <Image style={styles.imageStyle}  source={require('../assets/logo.png')} />
                <Text style={styles.titleStyle}>Welcome to cloudChat</Text>
                <Text style={styles.metaText}>Share with anyone, anywhere.</Text>
                <Text style={styles.metaText} >A home for all  the groups in your life</Text>
           </View>
           <View style={styles.welcomeImageContainer}>
                <Image  style={styles.welcomImageStyle} source={require('../assets/welcom.png')} ></Image>
           </View>
           <View style={styles.buttonContainer}>
            <CustomButton title='Sign In' primary='true' onPress={()=> navigator.navigate('login')} ></CustomButton>
            <CustomButton title='Create An Account' secondary='true' onPress={()=> navigator.navigate('register')}  ></CustomButton>
           </View>
           

        </View>
    )

}


const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: Color.background_color
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
        alignItems:'center',
    
    }
})

export default GetStartedPage