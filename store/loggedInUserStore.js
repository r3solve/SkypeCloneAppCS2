import React, { createContext, useState, useEffect } from "react";
import { getAllUsers } from "../helpers/firebase";

const CurrentUserContext = createContext({});

function CurrentUserProvider({ children }) {
  const [activeUser, updateActiveUser] = useState('');
  const [activeUserObject, updateActiveUserObject] = useState({});
  const [all_users, setAllUsers] = useState([]);

  function setActiveUser(user) {
    updateActiveUser(user);
  }

  function removeActiveUser() {
    updateActiveUser('');
  }

  function removeActiveUserObject() {
    updateActiveUserObject({});
  }

  const values = {
    activeUser,
    setActiveUser,
    removeActiveUser,
    activeUserObject,
    updateActiveUserObject,
    allUsers: all_users,
    setAllUsers,
    
  };

  return (
    <CurrentUserContext.Provider value={values}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserContext, CurrentUserProvider };
