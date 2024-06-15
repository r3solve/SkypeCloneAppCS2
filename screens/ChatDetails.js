import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, FlatList, Text, TextInput, View, StyleSheet, Platform, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Color';
import { MessageContext } from '../store/messageStore';
import { CurrentUserContext } from '../store/loggedInUserStore'
import { updateMessages, db, fetchChats } from '../helpers/firebase';
import { doc,collection, onSnapshot } from "firebase/firestore";

function ChatDetailsPage() {
  const navigation = useNavigation();
  const { addMessage, allChats } = useContext(MessageContext);
  const route = useRoute();
  const { id, chats, username } = route.params; // Destructure id from route params
  const userContext = useContext(CurrentUserContext)
  const { activeUser, allUsers, setAllUsers } = userContext; // Destructure activeUser and setAllUsers
  const [allThreadChats, setThreadChats] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // useEffect(() => {
  //   const unsub = onSnapshot(doc(db, "chats", id), (doc) => {
  //     if (doc.exists()) {
  //       setThreadChats(doc.data()?.allThreadChats || []);
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsub();
  // }, [id]);

  useEffect(()=> {
    setThreadChats(chats)
   }, [])

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = { id: `${messages.length + 1}`, text: newMessage, sender: activeUser };
      addMessage(id, message); // Add message to context
      setThreadChats((prev) => [...prev, message]); // Update local state
      updateMessages(id, [...allThreadChats, message]); // Update Firestore
      setNewMessage('');
    }
  };

  const createAMessage = (contentText) => {
    if (newMessage.trim() !== '') {
      const message = { id: `${allThreadChats.length + 1}`, sender: activeUser, receiver: username, content: contentText };
      setThreadChats((prev) => [...prev, message]);
      updateMessages(id, [...allThreadChats, message]);
      setNewMessage('');
    }
  };

  return (
    <View behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <FlatList
        data={allThreadChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === activeUser ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <Ionicons
          name="camera"
          size={25}
          color={Color.primary_color}
          onPress={() => Alert.alert('Camera pressed', id)} // Placeholder for camera functionality
          style={styles.sendButton}
        />
        <Ionicons
          name="attach"
          size={25}
          color={Color.primary_color}
          onPress={() => Alert.alert('Attach pressed', activeUser)} // Placeholder for attachment functionality
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
          onPress={() => createAMessage(newMessage)}
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
