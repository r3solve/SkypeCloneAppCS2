import { createContext, useState } from "react";

const ChatStoreContext = createContext({
    chats: [],
    addChat: (id) => {},
    removeChat: (id) => {}
});

function ChatStoreContextProvider({ children }) {
    const [currentChats, setCurrentChats] = useState([]);

    const addChat = (id) => {
        setCurrentChats((prevChats) => [...prevChats, id]);
    };

    const removeChat = (id) => {
        setCurrentChats((prevChats) => prevChats.filter(chatId => chatId !== id));
    };

    const values = {
        chats: currentChats,
        addChat: addChat,
        removeChat: removeChat
    };

    return (
        <ChatStoreContext.Provider value={values}>
            {children}
        </ChatStoreContext.Provider>
    );
}

export { ChatStoreContext, ChatStoreContextProvider };
