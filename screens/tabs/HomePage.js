import React, { useEffect, useContext, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, Modal, ScrollView, BackHandler, ActivityIndicator } from "react-native";
import ChatComponent from "../../components/chatComponent";
import { Searchbar, FAB } from 'react-native-paper';
import Color from "../../constants/Color";
import { Ionicons } from "@expo/vector-icons";
import AccountBar from "../../components/AccountBar";
import { MessageContext } from "../../store/messageStore";
import { useNavigation} from "@react-navigation/native";
import { CurrentUserContext } from "../../store/loggedInUserStore";
import useMessageStore from "../../store/FibaseMessages";
import {db} from '../../functions/firebase-queries'
import { useUserCurrentStore, useCurrentDataStore } from "../../state/currentUserStore";
import { onSnapshot, or , where, collection , query} from "firebase/firestore";

function HomePage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { allChats, setChats } = useContext(MessageContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { activeUser, activeUserObject, setAllUsers, allUsers } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const {currentEmail} = useUserCurrentStore();
  const {initailizeMessages, userMessages} = useCurrentDataStore()
  const [fetchedData, setFetechData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const q = query(
          collection(db, "chats"),
          or(where("receiver", "==", currentEmail), where("createdBy", "==", currentEmail))
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let allChats = [];
          querySnapshot.forEach((data) => {
            allChats.push({ id: data.id, ...data.data() });
          });
          setFetechData(allChats);
          initailizeMessages(allChats);
          setIsLoading(false);
        }, (err) => {
          console.error("Error fetching chats: ", err);
          setIsLoading(false);
        });

        return unsubscribe;
      } catch (err) {
        console.error('Error fetching data: ', err);
        setIsLoading(false);
      }
    };

    const unsubscribe = fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentEmail])

  useEffect(() => {
    // Prevent going back to login page after signing in
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    // Clean up the listener when component unmounts
    return () => backHandler.remove();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({ item }) => {
    return (
      <ChatComponent
        onPress={() => navigation.navigate('thread', { username: item.receiver ,id:item.id, chats:item.chats })}
        user={`${item?.createdBy}/${item.receiver}`}
        message={item?.chats.length > 0 ? item?.chats[(item?.chats.length -1)].content : "No messages yet"}
        uri={item?.profileUrl}
      />
    );
  };

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
      {isLoading && <ActivityIndicator size={50} />}
        <FlatList
          data={fetchedData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
        onPress={() => console.log(activeUserObject)}
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
