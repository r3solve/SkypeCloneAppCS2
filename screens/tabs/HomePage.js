import { Button, FlatList, StyleSheet, Text, View, Modal, ScrollView } from "react-native";
import ChatComponent from "../../components/chatComponent";
import { useEffect, useCallback, useContext, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { Searchbar, FAB } from 'react-native-paper';
import Color from "../../constants/Color";
import { ChatStoreContext } from "../../store/chatstore-context";
import { Ionicons } from "@expo/vector-icons";
import AccountBar from "../../components/AccountBar";

let DATA = [
  {
    id: 1,
    createdBy: 'john55',
    receiver: 'bob44',
    link: `cloud/1`,
    chats: [
      { sender: 'john55', content: 'Can you review this document?' },
      { sender: 'john55', content: 'I have made some mistakes so be careful' }
    ]
  },
  {
    id: 2,
    createdBy: 'john55',
    receiver: 'bob22',
    link: `cloud/2`,
    chats: [
      { sender: 'Alice Smith', content: 'Please check the latest report.' },
      { sender: 'Bob Johnson', content: 'Sure, I will review it.' }
    ]
  },

  {
    id: 3,
    createdBy: 'john',
    receiver: 'bob22',
    link: `cloud/2`,
    chats: [
      { sender: 'Alice Smith', content: 'Please check the latest report.' },
      { sender: 'Bob Johnson', content: 'Sure, I will review it.' }
    ]
  },
 
];


const actions = [
  {
    text: "Cloud Copilot",
    icon: require("../../assets/copilot.png"),
    name: "copilot",
    position: 1,
    color: Color.tertiary_color,
    size: 50
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

function HomePage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const chatsContxt = useContext(ChatStoreContext);
  const allChats = chatsContxt.chats;
  const loggedInUser = 'john55'
  const [searchQuery, setSearchQuery] = useState('');
  const [chatItem, setActiveUserState] = useState({});
  const navigate = useNavigation();
  const route = useRoute();
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    setFilteredData(DATA.filter(chat => chat.createdBy === loggedInUser));
  }, [loggedInUser]);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <Searchbar
          style={{ height: 50, width: 'auto', fontSize: 12, backgroundColor: '#e4ebf1' }}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={({item}) => <ChatComponent user={item.receiver} message={item.chats[0].content} />}
        keyExtractor={item => item.id}
      />
        <Modal animationType="slide" transparent={true} visible={isModalVisible} style={{height:"70%"}}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.topModal}>
                <Searchbar
                  style={{ height: 50, width: '80%', fontSize: 12, backgroundColor: '#e4ebf1', marginRight:15 }}
                  placeholder="Contacts"
                  value={searchQuery}
                  placeholderTextColor={'gray'}
                />
                <Ionicons  color='#888181' style={{alignSelf:'center'}} size={40} onPress={toggleModal} name='close'></Ionicons>
              </View>
            
              <View style={styles.searchContent}>
                <ScrollView>
                <AccountBar></AccountBar>
                <AccountBar></AccountBar>
                <AccountBar></AccountBar>
                <AccountBar></AccountBar>
                <AccountBar></AccountBar>
                <AccountBar></AccountBar>
                <AccountBar></AccountBar>
                <AccountBar></AccountBar>
                <AccountBar></AccountBar>
                <AccountBar></AccountBar>


                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
        <FAB
            icon="plus"
            style={styles.fab}
            onPress={toggleModal}
            color={Color.background_color}
          
          />
      </View>

    
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.background_color,
    paddingVertical: 4
  },
  searchContainer: {
    margin: 4,
    width: "100%",
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.background_color, 
    marginTop:30,
    opacity:0.95
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Color.primary_color
  },
  topModal:{
    flexDirection:'row'
  },
  searchContent:{
    margin:10
  }
 
});

export default HomePage;
