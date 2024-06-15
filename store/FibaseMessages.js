import { create } from "zustand";

// Define the message store
const useMessageStore = create((set) => ({
  allMessagesByUser: [], // Initial state
  activeUser : '',
  setMessages: (messages) => set({ allMessagesByUser: messages }),

  addAChat: (message) => set((state) => ({
    allMessagesByUser: [...state.allMessagesByUser, message]
  })),
  setActiveUser : (username)=> {activeUser:username}
}));


export default useMessageStore;
