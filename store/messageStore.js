
import React, { createContext, useState } from "react";
import { getAllUserChats } from "../helpers/firebase";
const MessageContext = createContext({});
let DATA = []; // Initialize with your initial data if any

const MessageProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  const addChat = (chat) => {
    setChats(prevChats => [...prevChats, chat]);
  };

  const addMessage = (chatId, message) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, chats: [...chat.chats, message] } : chat
      )
    );

  const fetchChats =(chats) => {
    setChats((prev)=> [...prev, chats])
  }
  };

  return (
    <MessageContext.Provider value={{ allChats: chats, addChat, addMessage, setChats}}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageProvider, MessageContext };
