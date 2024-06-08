import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import ChatComponent from "../components/chatComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";
import { Alert } from "react-native";
import Color from "../constants/Color";

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
      icon: require("../assets/copilot.png"),
      name: "copilot",
      position: 1
    },
    {
      text: "Text",
      icon: require("../assets/chat.png"),
      name: "text",
      position: 3
    },
  ];

function UsersPage(){
    const navigate = useNavigation()
    const route = useRoute()
    const renderItem =(item)=> {
        return <ChatComponent user={item.item.user} message={item.item.message} onPress={()=> navigate.navigate('thread',{id:item.item.id}) } />
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList data={DATA} renderItem={item => renderItem(item)} keyExtractor={ item => item.id} />
            <FloatingAction
                actions={actions}
                color={Color.primary_color}
                onPressItem={name => {
                    if (name === 'copilot'){
                        Alert.alert('You pressed', name)
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
    }
})

export default UsersPage