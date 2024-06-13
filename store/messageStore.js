// context.js

import React, { createContext, useState } from "react";

const MessageContext = createContext({});
let DATA = []; // Initialize with your initial data if any

const MessageProvider = ({ children }) => {
  const [chats, setChats] = useState([...DATA]);

  const addChat = (chat) => {
    setChats(prevChats => [...prevChats, chat]);
  };

  const addMessage = (chatId, message) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, chats: [...chat.chats, message] } : chat
      )
    );
  };

  return (
    <MessageContext.Provider value={{ allChats: chats, addChat, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageProvider, MessageContext };
