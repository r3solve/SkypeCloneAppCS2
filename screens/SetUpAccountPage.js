import { useState } from 'react'
import { View,Text, TextInput, StyleSheet, Alert, ActivityIndicator} from 'react-native'
import { Avatar,  CheckBox } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import User from '../models/User';
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Color';
import CustomButton from '../components/CustomButton';
import { db, auth } from '../functions/firebase-queries';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { pushUserInfo } from '../helpers/http';
import useUserCurrentStore from '../state/currentUserStore';

export default function SetUpAccountPage({ navigation }) {
    const [avatarUrl, setAvatarUrl] = useState("https://uifaces.co/our-content/donated/6MWH9Xi_.jpg")
    const [check, setCheck] = useState(false);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [value, setValue] = useState("");
    const [password, setPassword] = useState('')
    const [formattedValue, setFormattedValue] = useState("");
    const [isLoading, setLoading] = useState(false)
    const { setCurrentUser, setCurrentEmail, currentEmail } = useUserCurrentStore()

    const handleCreateAccount = async () => {
        if (!username || !email || !phoneNumber || !password) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        try {
            setLoading(true)
            let  u1 = {username:username, email:email, phone: phoneNumber, profileUrl: avatarUrl}
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            pushUserInfo(u1)
            setLoading(false)
            setCurrentEmail(u1.email)
            Alert.alert("Success", "Account created successfully.")
            console.log(currentEmail)
            navigation.navigate('home')
        } catch (error) {
            console.error("Error creating account: ", error);
            Alert.alert("Error", error.message);
        }
    };


    return (
    <>
    <View style={styles.mainContainer}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{alignSelf:'flex-start', paddingBottom:40, marginLeft:10}} >
            <Ionicons  name='chevron-back-sharp' size={45}></Ionicons>
        </TouchableOpacity>
        <View style={styles.avatar}>
            <TouchableOpacity>
                <Avatar  size={100} rounded={true} source={{uri:avatarUrl}} ></Avatar>
                <Text style={{position:'relative', bottom:60, textAlign:'center'}} >Set Avatar</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.form}>
            <TextInput autoCapitalize='none' onChangeText={(text)=>setUsername(text)} style={styles.input} placeholder='@Username' ></TextInput>
            <PhoneInput onChangeText={(text)=> setValue(text)}  
                onChangeFormattedText={(text) => {
                setPhoneNumber(text);
                }}
                containerStyle={styles.input}
                textContainerStyle={[styles.input,
                    {paddingTop:10}]} >
             </PhoneInput>
            <TextInput autoCapitalize='none' onChangeText={(text)=> setEmail(text)}  style={styles.input}
                placeholder='Email Address' >
                    
             </TextInput>
            <TextInput autoCapitalize='none' onChangeText={(text) => setPassword(text)} secureTextEntry={true} 
                style={styles.input} placeholder='Password' >
            </TextInput>
            <View style={{flexDirection:'row'}}>
                <CheckBox onPress={()=> setCheck((check) => !check)}  containerStyle={{backgroundColor:Color.background_color, paddingRight:0}} checked={check}/>
                <Text style={{fontSize:12, paddingVertical:16, fontWeight:'100'}} >Sync contacts with servers</Text>
            </View>

            <View style={{flexDirection:'row'}}>
                <CheckBox onPress={()=> setCheck((check) => !check)}  containerStyle={{backgroundColor:Color.background_color, paddingRight:0}} checked={check}/>
                <View style={{padding:0}}>
                <Text style={{fontSize:12, paddingVertical:16, fontWeight:'100'}} >I agree to the
                 <Text style={{color:Color.primary_color, fontWeight:'300', fontSize:12}}>
                Terms of service</Text></Text>
                <Text style={{color:Color.primary_color, fontWeight:'300', fontSize:12}} >Privay Policy</Text>
                </View>
                
            </View>
            { isLoading && <ActivityIndicator size={30}></ActivityIndicator>}
            <View style={{marginTop:40, width:300}}>
                <CustomButton title="Create Account" primary='true' onPress={handleCreateAccount}  ></CustomButton>
            </View>
            
           
                
        </View>
        


    </View>
    </>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Color.background_color
    },
    input: {
        height: 45,
        width:'95%',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#ecf1f1',
        width:270
    },
    avatar: {
        
    },
    form: {
        backgroundColor: Color.background_color

    }
})
