// DataModel -->
// [{"chats": [{"content": "New chat started", "sender": "john55"}], 
// "createdBy": "john55", "id": 1, "link": "cloud/1718276974982", "receiver": "janed"}]

import React, { useState } from "react";

const UserContext = React.createContext({})

const UserProvider = ({ children }) => {
   const [all_users, setAllUsers] = useState([])
    
    return (
      <UserContext.Provider value={{ all_users: all_users, setAllUsers: setAllUsers}}>
        {children}
      </UserContext.Provider>
    );
  };