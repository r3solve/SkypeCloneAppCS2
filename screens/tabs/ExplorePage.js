import * as React from 'react';
import { useState, useContext } from 'react';
import { FAB, Portal, Provider as PaperProvider, Searchbar } from 'react-native-paper';
import Color from '../../constants/Color';
import { Alert, View, Text, FlatList, StyleSheet } from 'react-native';
import AccountBar from '../../components/AccountBar';
import { useNavigation } from '@react-navigation/native';
import { ChatStoreContext } from '../../store/chatstore-context';
import { MessageContext, MessageProvider } from '../../store/messageStore';
import { CurrentUserContext } from '../../store/loggedInUserStore';
import {pushChat} from '../../helpers/http';

const DATA = [
  { id: 1, bio: "Coffee addict ☕, code lover 💻", user: 'Jane Doe', username: 'janed', email: 'jane.doe@example.com', dateOfBirth: '1990-05-14' },
  { id: 2, bio: "Tech geek 🤓, always exploring 🚀", user: 'Thomas Hanks', username: 'thomash', email: 'thomas.hanks@example.com', dateOfBirth: '1985-03-22' },
  { id: 3, bio: "Morning person ☀️, nature enthusiast 🌿", user: 'Alice Johnson', username: 'alicej', email: 'alice.johnson@example.com', dateOfBirth: '1992-07-08' },
  { id: 4, bio: "Web developer 💻, music lover 🎵", user: 'Bob Smith', username: 'bobsmith', email: 'bob.smith@example.com', dateOfBirth: '1988-01-17' },
  { id: 5, bio: "Adventure seeker 🌍, dog mom 🐶", user: 'Charlie Brown', username: 'charlieb', email: 'charlie.brown@example.com', dateOfBirth: '1991-10-30' },
  { id: 6, bio: "Bookworm 📚, tea lover ☕", user: 'Diana Prince', username: 'dianap', email: 'diana.prince@example.com', dateOfBirth: '1989-04-12' },
  { id: 7, bio: "Fitness freak 💪, travel junkie ✈️", user: 'Edward Norton', username: 'edwardn', email: 'edward.norton@example.com', dateOfBirth: '1983-06-09' },
  { id: 8, bio: "Foodie 🍔, movie buff 🎬", user: 'Fiona Shrek', username: 'fionas', email: 'fiona.shrek@example.com', dateOfBirth: '1995-09-21' },
  { id: 9, bio: "Creative mind 🎨, night owl 🦉", user: 'George Clooney', username: 'georgec', email: 'george.clooney@example.com', dateOfBirth: '1980-02-15' },
  { id: 10, bio: "Dreamer ✨, always smiling 😊", user: 'Helen Mirren', username: 'helenm', email: 'helen.mirren@example.com', dateOfBirth: '1978-12-05' },
  { id: 11, bio: "Work hard, play harder 🎉, coffee addict ☕", user: 'Iris West', username: 'irisw', email: 'iris.west@example.com', dateOfBirth: '1987-11-19' },
  { id: 12, bio: "Pirate at heart 🏴‍☠️, rum enthusiast 🥃", user: 'Jack Sparrow', username: 'jacks', email: 'jack.sparrow@example.com', dateOfBirth: '1981-07-04' },
  { id: 13, bio: "Netflix and chill expert 🍿, cat lover 🐱", user: 'Karen Page', username: 'karenp', email: 'karen.page@example.com', dateOfBirth: '1993-05-27' },
  { id: 14, bio: "Movie fanatic 🎥, beach bum 🏖️", user: 'Leonardo DiCaprio', username: 'leonardod', email: 'leonardo.dicaprio@example.com', dateOfBirth: '1975-11-11' },
  { id: 15, bio: "Life's too short for bad movies 🎬, wine lover 🍷", user: 'Meryl Streep', username: 'meryls', email: 'meryl.streep@example.com', dateOfBirth: '1969-08-22' },
  { id: 16, bio: "Coffee first, questions later ☕, dreamer ✨", user: 'Natalie Portman', username: 'nataliep', email: 'natalie.portman@example.com', dateOfBirth: '1982-06-09' },
  { id: 17, bio: "Sarcastic by nature 😏, book lover 📖", user: 'Oscar Wilde', username: 'oscarw', email: 'oscar.wilde@example.com', dateOfBirth: '1990-10-16' },
  { id: 18, bio: "Always hungry 🍔, movie buff 🎬", user: 'Paul Rudd', username: 'paulr', email: 'paul.rudd@example.com', dateOfBirth: '1979-04-21' },
  { id: 19, bio: "Film fanatic 🎞️, foodie 🍕", user: 'Quentin Tarantino', username: 'quentint', email: 'quentin.tarantino@example.com', dateOfBirth: '1965-03-27' },
  { id: 20, bio: "Wanderlust ✈️, night owl 🌙", user: 'Rachel Green', username: 'rachelg', email: 'rachel.green@example.com', dateOfBirth: '1984-12-01' }
];

const CallsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const { addChat, allChats } = useContext(MessageContext);
  const {loggedInUser} = useContext(CurrentUserContext)
  const navigation = useNavigation();
  const { activeUser } = useContext(CurrentUserContext); // Destructure activeUser directly

  const handleFilter = (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      const filteredData = DATA.filter((item) => item.user.toLowerCase().includes(text.toLowerCase()));
      setResults(filteredData);
    } else {
      setResults([]);
    }
  };

  const addUserToChats = (user) => {

    const existingChat = allChats.find(chat => chat.receiver === user.username);
  
    if (existingChat) {
        navigation.navigate('thread', existingChat.id);
    } else {
        // Create a new chat and navigate to its thread
        const newChat = {
            id: allChats.length + 1,
            createdBy: activeUser.username, // Access activeUser directly here
            receiver: user.username,
            link: `cloud/${Date.now()}`,
            chats: [{ sender: 'cloudChat', content: 'New chat started' }],
        };
        addChat(newChat);
        pushChat(newChat.id, newChat.createdBy, newChat.receiver, newChat.link, newChat.chats);
        navigation.navigate('thread', { id: newChat.id, username: newChat.receiver });
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
      <FlatList data={results} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
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
    fontWeight: 'light',
    textAlign: 'center',
    color: '#c5c1c1',
  },
});


export default CallsPage;
