import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, FlatList, Text, TextInput, View, StyleSheet, Platform, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Color';
import { MessageContext } from '../store/messageStore';
import { CurrentUserContext } from '../store/loggedInUserStore'
import { updateMessages, fetchChats } from '../helpers/firebase';
import { doc, collection, onSnapshot, query , where, getDocs} from "firebase/firestore";
import { db } from '../functions/firebase-queries'
import { downloadAllChats } from '../functions/firebase-queries';
import { useUserCurrentStore } from '../state/currentUserStore';
function ChatDetailsPage() {
  const navigation = useNavigation();
  const { addMessage, allChats } = useContext(MessageContext);
  const route = useRoute();
  const { id,  username, chats } = route.params; // Destructure id from route params
  const userContext = useContext(CurrentUserContext)
  const [allThreadChats, setThreadChats] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const {currentEmail} = useUserCurrentStore();
  const [currentsent, setCurrentSent] = useState([])

  

  useEffect(() => {
    async function fetchInitialData() {
      try {
        let allChats = []
        const q = query(collection(db, "chats"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((data) => {
            if (data.id == id) {
              allChats.push({ ...data.data().chats });
            }
          });
          if (currentsent.length === 0 ){
            setThreadChats(chats);
          }else {
            chats = currentsent + chats
            setThreadChats(chats)
          }
        });
        return unsubscribe;
      } catch (err) {
        console.error("Error fetching chats", err);
      }
    }
    
    fetchInitialData();
  }, [])
  

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = { id: `${allThreadChats.length + 1}`, sender: currentEmail, receiver: username, content: newMessage, createdAtTime: new Date().toLocaleTimeString(), createdAtDate: new Date().toDateString() };
      setCurrentSent((prev) => [...prev, message]);
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
          <View style={[styles.messageContainer, item.sender === currentEmail ? styles.myMessage : styles.otherMessage]}>
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
          onPress={() => Alert.alert('Attach pressed', id)} // Placeholder for attachment functionality
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
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: Color.primary_color,
    alignSelf: 'flex-end',
  },
  otherMessage: {
    marginVertical: 15,
    backgroundColor: '#729199',
    alignSelf: 'flex-start',
    
  },
  messageText: {
    color: 'white',
  
  },
  timeText:{
    color:' white',
    fontSize: 12,

  }
  ,
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
