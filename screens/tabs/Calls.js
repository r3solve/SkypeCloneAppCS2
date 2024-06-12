import * as React from 'react';
import { useState } from 'react';
import { FAB, Portal, Provider as PaperProvider, Searchbar } from 'react-native-paper';
import Color from '../../constants/Color';
import { Alert, View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import AccountBar from '../../components/AccountBar';
import { useContext } from 'react';
import { ChatStoreContext } from '../../store/chatstore-context';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  { id: 1, bio: "Coffee addict ☕, code lover 💻", user: 'Jane Doe' },
  { id: 2, bio: "Tech geek 🤓, always exploring 🚀", user: 'Thomas Hanks' },
  { id: 3, bio: "Morning person ☀️, nature enthusiast 🌿", user: 'Alice Johnson' },
  { id: 4, bio: "Web developer 💻, music lover 🎵", user: 'Bob Smith' },
  { id: 5, bio: "Adventure seeker 🌍, dog mom 🐶", user: 'Charlie Brown' },
  { id: 6, bio: "Bookworm 📚, tea lover ☕", user: 'Diana Prince' },
  { id: 7, bio: "Fitness freak 💪, travel junkie ✈️", user: 'Edward Norton' },
  { id: 8, bio: "Foodie 🍔, movie buff 🎬", user: 'Fiona Shrek' },
  { id: 9, bio: "Creative mind 🎨, night owl 🦉", user: 'George Clooney' },
  { id: 10, bio: "Dreamer ✨, always smiling 😊", user: 'Helen Mirren' },
  { id: 11, bio: "Work hard, play harder 🎉, coffee addict ☕", user: 'Iris West' },
  { id: 12, bio: "Pirate at heart 🏴‍☠️, rum enthusiast 🥃", user: 'Jack Sparrow' },
  { id: 13, bio: "Netflix and chill expert 🍿, cat lover 🐱", user: 'Karen Page' },
  { id: 14, bio: "Movie fanatic 🎥, beach bum 🏖️", user: 'Leonardo DiCaprio' },
  { id: 15, bio: "Life's too short for bad movies 🎬, wine lover 🍷", user: 'Meryl Streep' },
  { id: 16, bio: "Coffee first, questions later ☕, dreamer ✨", user: 'Natalie Portman' },
  { id: 17, bio: "Sarcastic by nature 😏, book lover 📖", user: 'Oscar Wilde' },
  { id: 18, bio: "Always hungry 🍔, movie buff 🎬", user: 'Paul Rudd' },
  { id: 19, bio: "Film fanatic 🎞️, foodie 🍕", user: 'Quentin Tarantino' },
  { id: 20, bio: "Wanderlust ✈️, night owl 🌙", user: 'Rachel Green' }
];

const CallsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const ChatContxt = useContext(ChatStoreContext)
  const navigator = useNavigation()
 
  const handleFilter = (text) => {
    setSearchQuery(text);
    if (text.length > 0 ){
     let filteredData = DATA.filter(item => item.user.toLowerCase().includes(text.toLowerCase()));
      setResults(filteredData);
    }
    else {
      setResults([])
    }
    
  }

  const addUserToChats = (user)=> {
    if (!(ChatContxt.chats.includes(user))) {
      ChatContxt.addChat(user)
      navigator.navigate('thread', {link:user.link})
    }
    
  }

  const renderItem = ({ item }) => {
    return <AccountBar onPress={()=>{}} user={'@' + item.user} onPress={() => {addUserToChats(item)}}>{item.bio}</AccountBar>;
  }

  return (
    <View style={styles.container}>
      <Searchbar
        style={{ height: 50, width: 'auto', fontSize: 12, backgroundColor: '#e4ebf1' }}
        placeholder="@username"
        onChangeText={(text) => handleFilter(text)}
        value={searchQuery}
        onClearIconPress={() => setSearchQuery('')}
        placeholderTextColor={"grey"}
      />
      { 
      searchQuery.length == 0 && <View style={styles.noContentTextContainer}>
        <Text style={styles.noContentText}>Search for User</Text>
        </View>
      }
      
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background_color
  },
  noContentTextContainer:{
    flex:1,
    padding:10,
    alignContent:'center',
    justifyContent:'center'
  },
  noContentText:{
    fontSize:20,
    fontWeight:'light',
    textAlign:'center',
    color: '#c5c1c1'
  }
})

export default CallsPage;
