import React, { useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, FlatList, Text, TextInput, View, StyleSheet,ScrollView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Color'; // Ensure Color is properly imported


function ChatDetailsPage() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params; // Destructure id from route params

    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello!', sender: 'user1' },
        { id: '2', text: 'Hi there!', sender: 'user2' },
        // Add initial messages here if needed
    ]);

    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([
                ...messages,
                { id: (messages.length + 1).toString(), text: newMessage, sender: 'me' },
            ]);
            setNewMessage('');
        }
    };

    return (
        <View
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                style={styles.messagesList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <Ionicons
                    name="send"
                    size={30}
                    color={Color.primary_color}
                    onPress={sendMessage}
                    style={styles.sendButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background_color,
    },
    messagesList: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        maxWidth: '80%',
    },
    myMessage: {
        backgroundColor: Color.primary_color,
        alignSelf: 'flex-end',
    },
    otherMessage: {
        backgroundColor: 'gray',
        alignSelf: 'flex-start',
    },
    messageText: {
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: {
        padding: 10,
    },
});

export default ChatDetailsPage;
