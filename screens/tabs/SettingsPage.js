import React from 'react';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Divider, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../constants/Color';

function SettingsPage({route}) {
    const navigation = useNavigation();
    const [avatarUrl, setAvatarUrl] = useState("https://uifaces.co/our-content/donated/6MWH9Xi_.jpg")


    const settingsOptions = [
        { icon: 'person', title: 'Account', onPress: () => {navigation.navigate('account')} },
        { icon: 'lock-closed', title: 'Privacy', onPress: () => {navigation.navigate('privacy')} },
        { icon: 'notifications', title: 'Notifications', onPress: () => {navigation.navigate('notifications')} },
        { icon: 'chatbubbles', title: 'Chats', onPress: () => { navigation.navigate('chats')} },
        { icon: 'globe', title: 'Language', onPress: () => { navigation.navigate('language')} },
        { icon: 'help-circle', title: 'Help', onPress: () => { navigation.navigate('help') } },
        { icon: 'information-circle', title: 'About', onPress: () => { navigation.navigate('about') } },
    ];

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Avatar.Image size={100} source={{uri: avatarUrl }} ></Avatar.Image>
                </TouchableOpacity>
                <Text style={styles.headerText}>Your Name</Text>
                <Text style={styles.headerSubText}>Status message goes here</Text>
            </View>

            <Divider />

            {settingsOptions.map((option, index) => (
                <TouchableOpacity key={index} onPress={option.onPress} style={styles.optionContainer}>
                    <Ionicons name={option.icon} size={24} color="gray" />
                    <Text style={styles.optionText}>{option.title}</Text>
                </TouchableOpacity>
            ))}

            <Divider />

            <TouchableOpacity onPress={() => {}} style={styles.optionContainer}>
                <Ionicons name="log-out" size={24} color="#e77f7c" />
                <Text style={styles.optionText}>Log out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Color.background_color,
    },
    header: {
        alignItems: 'center',
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        color: 'black',
        marginTop: 10,
    },
    headerSubText: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    optionText: {
        marginLeft: 15,
        fontSize: 16,
        color: 'black',
    },
});

export default SettingsPage;
