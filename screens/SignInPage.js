import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import Color from "../constants/Color";
import CustomButton from "../components/CustomButton";
import { CurrentUserContext } from "../store/loggedInUserStore";

const DATA = [
    { id: 1, bio: "Coffee addict ☕, code lover 💻", user: 'Jane Doe', username: 'janed', email: 'jane.doe@example.com', dateOfBirth: '1990-05-14', password: 'password1' },
    { id: 2, bio: "Tech geek 🤓, always exploring 🚀", user: 'Thomas Hanks', username: 'thomash', email: 'thomas.hanks@example.com', dateOfBirth: '1985-03-22', password: 'password2' },
    { id: 3, bio: "Morning person ☀️, nature enthusiast 🌿", user: 'Alice Johnson', username: 'alicej', email: 'alice.johnson@example.com', dateOfBirth: '1992-07-08', password: 'password3' },
    { id: 4, bio: "Web developer 💻, music lover 🎵", user: 'Bob Smith', username: 'bobsmith', email: 'bob.smith@example.com', dateOfBirth: '1988-01-17', password: 'password4' },
    { id: 5, bio: "Adventure seeker 🌍, dog mom 🐶", user: 'Charlie Brown', username: 'charlieb', email: 'charlie.brown@example.com', dateOfBirth: '1991-10-30', password: 'password5' },
    { id: 6, bio: "Bookworm 📚, tea lover ☕", user: 'Diana Prince', username: 'dianap', email: 'diana.prince@example.com', dateOfBirth: '1989-04-12', password: 'password6' },
    { id: 7, bio: "Fitness freak 💪, travel junkie ✈️", user: 'Edward Norton', username: 'edwardn', email: 'edward.norton@example.com', dateOfBirth: '1983-06-09', password: 'password7' },
    { id: 8, bio: "Foodie 🍔, movie buff 🎬", user: 'Fiona Shrek', username: 'fionas', email: 'fiona.shrek@example.com', dateOfBirth: '1995-09-21', password: 'password8' },
    { id: 9, bio: "Creative mind 🎨, night owl 🦉", user: 'George Clooney', username: 'georgec', email: 'george.clooney@example.com', dateOfBirth: '1980-02-15', password: 'password9' },
    { id: 10, bio: "Dreamer ✨, always smiling 😊", user: 'Helen Mirren', username: 'helenm', email: 'helen.mirren@example.com', dateOfBirth: '1978-12-05', password: 'password10' },
    { id: 11, bio: "Work hard, play harder 🎉, coffee addict ☕", user: 'Iris West', username: 'irisw', email: 'iris.west@example.com', dateOfBirth: '1987-11-19', password: 'password11' },
    { id: 12, bio: "Pirate at heart 🏴‍☠️, rum enthusiast 🥃", user: 'Jack Sparrow', username: 'jacks', email: 'jack.sparrow@example.com', dateOfBirth: '1981-07-04', password: 'password12' },
    { id: 13, bio: "Netflix and chill expert 🍿, cat lover 🐱", user: 'Karen Page', username: 'karenp', email: 'karen.page@example.com', dateOfBirth: '1993-05-27', password: 'password13' },
    { id: 14, bio: "Movie fanatic 🎥, beach bum 🏖️", user: 'Leonardo DiCaprio', username: 'leonardod', email: 'leonardo.dicaprio@example.com', dateOfBirth: '1975-11-11', password: 'password14' },
    { id: 15, bio: "Life's too short for bad movies 🎬, wine lover 🍷", user: 'Meryl Streep', username: 'meryls', email: 'meryl.streep@example.com', dateOfBirth: '1969-08-22', password: 'password15' },
    { id: 16, bio: "Coffee first, questions later ☕, dreamer ✨", user: 'Natalie Portman', username: 'nataliep', email: 'natalie.portman@example.com', dateOfBirth: '1982-06-09', password: 'password16' },
    { id: 17, bio: "Sarcastic by nature 😏, book lover 📖", user: 'Oscar Wilde', username: 'oscarw', email: 'oscar.wilde@example.com', dateOfBirth: '1990-10-16', password: 'password17' },
    { id: 18, bio: "Always hungry 🍔, movie buff 🎬", user: 'Paul Rudd', username: 'paulr', email: 'paul.rudd@example.com', dateOfBirth: '1979-04-21', password: 'password18' },
    { id: 19, bio: "Film fanatic 🎞️, foodie 🍕", user: 'Quentin Tarantino', username: 'quentint', email: 'quentin.tarantino@example.com', dateOfBirth: '1965-03-27', password: 'password19' },
    { id: 20, bio: "Wanderlust ✈️, night owl 🌙", user: 'Rachel Green', username: 'rachelg', email: 'rachel.green@example.com', dateOfBirth: '1984-12-01', password: 'password20' }
  ];
  

  function SignInPage() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userContext = useContext(CurrentUserContext)

    const handleSignIn = () => {
        // Find user in DATA array based on username (email) and password
        const user = DATA.find(user => user.username === username && user.password === password);

        if (user) {
            // Navigate to the home screen on successful login
            userContext.setActiveUser(user)
            navigation.navigate('home');
            setUsername('');
            setPassword('');
        } else {
            // Display an error message or handle unsuccessful login
            alert('Invalid username or password. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Image  style={styles.logoStyle} source={require('../assets/logo.png')} />
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
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
