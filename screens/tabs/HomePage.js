import React, { useEffect, useContext, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, Modal, ScrollView, BackHandler } from "react-native";
import ChatComponent from "../../components/chatComponent";
import { Searchbar, FAB } from 'react-native-paper';
import Color from "../../constants/Color";
import { Ionicons } from "@expo/vector-icons";
import AccountBar from "../../components/AccountBar";
import { MessageContext } from "../../store/messageStore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CurrentUserContext } from "../../store/loggedInUserStore";
import { getUser } from "../../helpers/firbase";

function HomePage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { allChats } = useContext(MessageContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();
  const {activeUser, activeUserObject, setActiveUserObject} = useContext(CurrentUserContext)
  const loggedInUser = useContext.activeUser
  


  useEffect(() => {
    // Prevent going back to login page after signing in
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    // Clean up the listener when component unmounts
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setFilteredData(allChats.filter(chat => chat.createdBy === loggedInUser?.username || chat.receiver === loggedInUser?.username));
  }, [allChats]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  setActiveUserObject(getUser(activeUser))

  return (

    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <Searchbar
          style={{ height: 50, width: 'auto', fontSize: 12, backgroundColor: '#e2eef8' }}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <ChatComponent 
            onPress={() => navigation.navigate('thread', { id: item.id, username:item.username })} 
            user={item.receiver} 
            message={item.chats[item.chats.length]?.content} 
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Modal animationType="slide" transparent={true} visible={isModalVisible} style={{ height: "70%" }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.topModal}>
              <Searchbar
                style={{ height: 50, width: '80%', fontSize: 12, backgroundColor: '#e2eef8', marginRight: 15 }}
                placeholder="Contacts"
                value={searchQuery}
                placeholderTextColor={'gray'}
              />
              <Ionicons color='#888181' style={{ alignSelf: 'center' }} size={40} onPress={toggleModal} name='close' />
            </View>
            <View style={styles.searchContent}>
              <ScrollView>
                {[...Array(10)].map((_, index) => (
                  <AccountBar key={index} />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      <FAB
        icon="circle"
        style={styles.fab2}
        onPress={()=> console.log(activeUserObject)}
        color={Color.background_color}
        size="10"
      />
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
    paddingVertical: 4,
  },
  searchContainer: {
    margin: 4,
    width: "100%",
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.background_color,
    marginTop: 30,
    opacity: 0.95,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Color.primary_color,
  },
  fab2: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: Color.primary_color,
  },
  topModal: {
    flexDirection: 'row',
  },
  searchContent: {
    margin: 10,
  },
});

export default HomePage;
