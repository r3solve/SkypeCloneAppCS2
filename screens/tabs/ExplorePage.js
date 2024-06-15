import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import AccountBar from '../../components/AccountBar';
import { useNavigation } from '@react-navigation/native';
import { MessageContext } from '../../store/messageStore';
import { CurrentUserContext } from '../../store/loggedInUserStore';
import { pushChat } from '../../helpers/http';
import Color from '../../constants/Color';
import { getAllUsers } from '../../helpers/firebase';
import useMessageStore from '../../store/FibaseMessages';

const CallsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const {  allChats } = useContext(MessageContext);
  const navigation = useNavigation();
  const { activeUser, allUsers, setAllUsers } = useContext(CurrentUserContext); // Destructure activeUser and setAllUsers
  const { allMessagesByUser, addAChat} = useMessageStore()
  useEffect(() => {
    // Fetch all users when the component mounts
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(); // Assuming getAllUsers function fetches all users
        setAllUsers(data); // Update context state with fetched users
        console.log(allMessagesByUser)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures it runs only once when component mounts

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
  

  const addUserToChats = (user) => {
    const existingChat = allChats.find((chat) => chat.receiver === user.username);

    if (existingChat) {
      navigation.navigate('thread', { id: existingChat.id });
    } else {
      const uniqueId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newChat = {
        id: uniqueId,
        createdBy: activeUser,
        receiver: user.email,
        link: `cloud/${Date.now()}`,
        chats: [],
      };
      addAChat(newChat)
      console.log(allMessagesByUser)
      pushChat(newChat.id, newChat.createdBy, newChat.receiver, newChat.link, newChat.chats);      navigation.navigate('thread', { id: newChat.id, username: newChat.receiver });
    }
  };

  const renderItem = ({ item }) => (
    <AccountBar onPress={() => addUserToChats(item)} user={'@' + item.username}>
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
      {searchQuery.length === 0 && (
        <View style={styles.noContentTextContainer}>
          <Text style={styles.noContentText}>Search for User</Text>
        </View>
      )}
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : null)}
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
