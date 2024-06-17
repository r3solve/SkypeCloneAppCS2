import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import AccountBar from '../../components/AccountBar';
import { useNavigation } from '@react-navigation/native';
import { MessageContext } from '../../store/messageStore';
import { CurrentUserContext } from '../../store/loggedInUserStore';
import { pushChat } from '../../helpers/http';
import Color from '../../constants/Color';
import { getDocs, doc, collection } from "firebase/firestore";
import useMessageStore from '../../store/FibaseMessages';
import { db, uploadChat } from "../../functions/firebase-queries";
import { useCurrentDataStore, useUserCurrentStore } from '../../state/currentUserStore';


const CallsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const {  allChats } = useContext(MessageContext);
  const navigation = useNavigation();
  const { activeUser, allUsers } = useContext(CurrentUserContext); // Destructure activeUser and setAllUsers
  const [isLoading, setLoading] = useState(false)
  const {updateUserMessages, updateAviableUsers, availbleUsers, userMessages, addMessage} = useCurrentDataStore()
  const {currentEmail} = useUserCurrentStore()

  useEffect(() => {
    const fetchData = async () => {
      let allData = []
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
          allData.push(doc.data())
          setResults(allData)
          updateAviableUsers(allData)
        setLoading(false)
        });
      } catch (err) {
        Alert.alert("Could Not Load User Data")
      }
    };

    fetchData();
  }, []);
// Empty dependency array ensures it runs only once when component mounts

  const handleFilter = (text) => {
    setSearchQuery(text);
    if (text.length > 0 && allUsers && allUsers.length > 0) {
      const filteredData = allUsers.filter((item) => {
        return (
          item.username && 
          item.username.trim().toLowerCase().includes(text.trim().toLowerCase())
        );
      });
      setResults(filteredData);
    } else {
      setResults([]);
    }
  };
  

  function addUserToChats(user){
      const existingChat = userMessages.find((chat) => chat.receiver === user.username)
      if (existingChat) {
          navigation.navigate('thread', { id: existingChat.id });
          return
      }else {
        const uniqueId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        let newChat = {
          id: uniqueId,
          createdAt: new Date().toDateString(),
          createdBy: currentEmail,
          receiver: user.username,
          link: `cloud/${Date.now()}`,
          chats: [],
        }
        uploadChat(newChat.id, newChat.createdBy, newChat.receiver, newChat.link, newChat.chats)
        addMessage(newChat)
        navigation.navigate('thread', { id: newChat.id, username: newChat.receiver, link: newChat.link });
      }

  }

  const renderItem = ({ item }) => (
    <AccountBar onPress={()=> addUserToChats(item)} user={'@' + item.username}>
      {item.bio}
    </AccountBar>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        style={{ height: 50, width: 'auto', fontSize: 12, backgroundColor: '#e2eef8' }}
        placeholder="@username"
        onChangeText={handleFilter}
        value={searchQuery}
        placeholderTextColor="grey"
      />
      {isLoading && <ActivityIndicator size={30}></ActivityIndicator>}
      {results.length === 0 && (
        <View style={styles.noContentTextContainer}>
          <Text style={styles.noContentText}>Search for User</Text>
        </View>
      )}
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => (item && item.email ? item.email.toString() : null)}
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background_color,
  },
  noContentTextContainer: {
    flex: 1,
    padding: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  noContentText: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    color: '#c5c1c1',
  },
});

export default CallsPage;
