// ChatDetailsPage.js

import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, FlatList, Text, TextInput, View, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Color';
import { MessageContext } from '../store/messageStore';

function ChatDetailsPage() {
  const navigation = useNavigation();
  const { addMessage, allChats } = useContext(MessageContext);
  const route = useRoute();
  const { id } = route.params; // Destructure id from route params

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Find the chat by id from allChats in context
    const chat = allChats.find(chat => chat.id === id);
    if (chat) {
      setMessages(chat.chats); // Set messages to the chats array of the found chat
    }
  }, [id, allChats]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = { id: `${messages.length + 1}`, text: newMessage, sender: 'me' };
      addMessage(id, message); // Add message to context
      setMessages([...messages, message]); // Update local state
      setNewMessage('');
    }
    console.log(allChats.find(chat => chat.id === id))
  };

  return (
    <View behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
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
        <Ionicons
          name="camera"
          size={25}
          color={Color.primary_color}
          onPress={() => Alert.alert('Camera pressed')} // Placeholder for camera functionality
          style={styles.sendButton}
        />
        <Ionicons
          name="attach"
          size={25}
          color={Color.primary_color}
          onPress={() => Alert.alert('Attach pressed')} // Placeholder for attachment functionality
          style={styles.sendButton}
        />
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Ionicons
          name="send"
          size={25}
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
    padding: 2,
  },
  messageContainer: {
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: Color.primary_color,
    alignSelf: 'flex-end',
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
    padding: 4,
  },
});

export default ChatDetailsPage;
