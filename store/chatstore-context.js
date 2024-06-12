import { createContext, useState } from "react";

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
        { sender: 'Bob Johnson', content: 'Sure, I will review it.' },
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
  

const ChatStoreContext = createContext({
    chats: [],
    addChat: (id) => {},
    removeChat: (id) => {},
    
    currentActiveUser:"",
    setCurrentUser: (username) => {},
    removeCurrentUser: (username) => {},
});

function ChatStoreContextProvider({ children }) {
    const [currentChats, setCurrentChats] = useState([]);
    const [currentUser, changeCurrentUser] = useState('');

    const addChat = (id) => {
        setCurrentChats((prevChats) => [...prevChats, id]);
    };

    const removeChat = (id) => {
        setCurrentChats((prevChats) => prevChats.filter(chatId => chatId !== id));
    };
    
    const setCurrentUser = (username) => {
        changeCurrentUser(username);
    };

    const removeCurrentUser = () => {
        changeCurrentUser('');
    };

    const values = {
        chats: currentChats,
        addChat: addChat,
        removeChat: removeChat,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        removeCurrentUser: removeCurrentUser
    };

    return (
        <ChatStoreContext.Provider value={values}>
            {children}
        </ChatStoreContext.Provider>
    );
}

export { ChatStoreContext, ChatStoreContextProvider, DATA };
