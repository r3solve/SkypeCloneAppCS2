import React, {useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import Color from "../constants/Color";
import CustomButton from "../components/CustomButton";
import { CurrentUserContext } from "../store/loggedInUserStore";
import { loginUser } from "../helpers/http";
import { getUser } from "../helpers/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../functions/firebase-queries";
import { useUserCurrentStore, useCurrentDataStore } from "../state/currentUserStore";


  function SignInPage() {
    const navigation = useNavigation();
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userContext = useContext(CurrentUserContext)
    const {activeUser, setActiveUser} = useContext(CurrentUserContext)
    const [isLoading, setLoading] = useState(false)
    const {setCurrentEmail, currentEmail} = useUserCurrentStore()
    const {userObject, setUserObject, userMessages, UpdateUserMessages, availableUsers, updateAvailableUsers} = useCurrentDataStore()

    const handleSignIn = () => {
        try {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password).then((res)=> {
            setCurrentEmail(res.user.email);
            setLoading(false);
            navigation.navigate('home');
            }).finally((err)=>{
                setLoading(false);
            })
          } catch (err) {
            setLoading(false);
            console.log(err);
            alert('Login failed: ' + err.message); // Optionally display the error message in the UI
            
          }
      };

    return (
        <View style={styles.container}>
            <Image  style={styles.logoStyle} source={require('../assets/logo.png')} />
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.forgotPassword} onPress={() => {/* Add forgot password logic */}}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
           { isLoading && <ActivityIndicator size={30}></ActivityIndicator>}
            <CustomButton title="Sign In" primary={true} onPress={handleSignIn} />
            <TouchableOpacity style={styles.signUp} onPress={()=> navigation.navigate('register')}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: Color.background_color,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: Color.primary_color,
    },
    signUp: {
        marginTop: 20,
        alignItems: 'center',
    },
    signUpText: {
        color: '#1e90ff',
    },
    logoStyle: {
        height: 130,
        width: 130,
        alignSelf: 'center'
    }
});

export default SignInPage;
