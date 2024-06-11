import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import ChatComponent from "../../components/chatComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";
import { Alert } from "react-native";
import { useContext, useState } from "react";
import { Searchbar } from 'react-native-paper';
import Color from "../../constants/Color";
import { ChatStoreContext } from "../../store/chatstore-context";

const DATA = [
  {id: 1,  message: "Hello there", user: 'Jane Doe'},
  {id: 2,  message: "How are you doing", user: 'Thomas Hanks'},
  {id: 3,  message: "Good morning", user: 'Alice Johnson'},
  {id: 4,  message: "What's up?", user: 'Bob Smith'},
  {id: 5,  message: "Have a nice day", user: 'Charlie Brown'},
  {id: 6,  message: "See you soon", user: 'Diana Prince'},
  {id: 7,  message: "Take care", user: 'Edward Norton'},
  {id: 8,  message: "Goodbye", user: 'Fiona Shrek'},
  {id: 9,  message: "Nice to meet you", user: 'George Clooney'},
  {id: 10, message: "Welcome!", user: 'Helen Mirren'},
  {id: 11, message: "Have a good one", user: 'Iris West'},
  {id: 12, message: "Thank you", user: 'Jack Sparrow'},
  {id: 13, message: "You're welcome", user: 'Karen Page'},
  {id: 14, message: "Yes, please", user: 'Leonardo DiCaprio'},
  {id: 15, message: "No, thank you", user: 'Meryl Streep'},
  {id: 16, message: "Excuse me", user: 'Natalie Portman'},
  {id: 17, message: "I'm sorry", user: 'Oscar Wilde'},
  {id: 18, message: "No problem", user: 'Paul Rudd'},
  {id: 19, message: "All the best", user: 'Quentin Tarantino'},
  {id: 20, message: "Good night", user: 'Rachel Green'}
];



const actions = [
    {
      text: "Cloud Copilot",
      icon: require("../../assets/copilot.png"),
      name: "copilot",
      position: 1,
      color : Color.tertiary_color,
      size:50
    },
    {
      text: "Text",
      icon: require("../../assets/chat.png"),
      name: "text",
      position: 3,
      iconWidth: 60,
      iconHeight: 60,
      color: Color.primary_color,
      size: 50
    },
  ];

function HomePage(){
    const chatsContxt = useContext(ChatStoreContext)
    const allChats = chatsContxt.chats
    const [searchQuery, setSearchQuery] =  useState('');
    const navigate = useNavigation()
    const route = useRoute()

    const handleDetailsPageVisit = (username) => {
        chatsContxt.setCurrentUser(username)
        navigate.navigate('thread', {username: username})
    }
    const renderItem =(item)=> {
        return <ChatComponent user={item.item.user} message={item.item.message} onPress={(item) => console.log(item)} />
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.searchContainer}>
            <Searchbar style={{height:50, width:'auto', fontSize:12, backgroundColor:'#e4ebf1'}}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                />
                </View>
            
            <FlatList data={allChats} renderItem={item => renderItem(item)} keyExtractor={ item => item.id} />
            <FloatingAction
                actions={actions}
                color={Color.primary_color}
                onPressItem={name => {
                    if (name === 'copilot'){
                        navigate.navigate('Home')
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor: Color.background_color,
        paddingVertical: 4
    },
    searchContainer:{
        margin:4,
        width: "150",
        height:40,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        marginVertical: 12
    }
})

export default HomePage