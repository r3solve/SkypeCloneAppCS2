import { createContext, useState } from "react";

let DATA = [

   
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
        <ChatStoreContext.Provider value={values, DATA}>
            {children}
        </ChatStoreContext.Provider>
    );
}

export { ChatStoreContext, ChatStoreContextProvider, DATA };
