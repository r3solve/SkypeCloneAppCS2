import { create } from "zustand";

const useUserCurrentStore = create((set) => ({
  currentEmail: '',
  setCurrentEmail: (email) => set(() => ({
    currentEmail: email
  })),
  currentUsername: '',
  setCurrentUsername: (username) => set(() => ({
    currentUsername: username
  })),
}));

const useCurrentDataStore = create((set) => ({
  userObject: {},//this is the userobject fetched from db,
  setUserObject: (obj) => set(() => ({
    userObject: obj // this function sets the objects
  })),
  userMessages: [],// this refers to all the message by the user initailized at signin
  updateUserMessages: (messages) => set((state) => ({
    userMessages: [...state.userMessages, ...messages]
  })),
  availbleUsers: [],// this refers to all the message by the user 
  updateAviableUsers: (user) => set((state) => ({
    availbleUsers: [...state.availbleUsers, user]
  })),// this 
  
}));

export { useUserCurrentStore, useCurrentDataStore };
