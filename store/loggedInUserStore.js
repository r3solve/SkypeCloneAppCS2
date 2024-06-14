import { createContext } from "react";
import { useState } from "react";

const CurrentUserContext = createContext({});

function CurrentUserProvider({ children }) {
    const [activeUser, updateActiveUser] = useState('');
    const [activeUserObject, updateActiveUserObject] = useState({})

    function setActiveUser(user) {
        updateActiveUser(user);
    }
    function setActiveUserObject(user) {
        updateActiveUser(user);
    }

    function removeActiveUser() {
        updateActiveUser('');
    }
    function removeActiveUserObject() {
        updateActiveUser({});
    }

    const values = {
        activeUser: activeUser,
        setActiveUser: setActiveUser,
        removeActiveUser: removeActiveUser,
        setActiveUserObject: setActiveUserObject
    };

    return (
        <CurrentUserContext.Provider value={values}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export { CurrentUserContext, CurrentUserProvider };
