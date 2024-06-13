import { createContext } from "react";
import { useState } from "react";

const CurrentUserContext = createContext({});

function CurrentUserProvider({ children }) {
    const [activeUser, updateActiveUser] = useState({});

    function setActiveUser(user) {
        updateActiveUser(user);
    }

    function removeActiveUser() {
        updateActiveUser({});
    }

    const values = {
        activeUser: activeUser,
        setActiveUser: setActiveUser,
        removeActiveUser: removeActiveUser
    };

    return (
        <CurrentUserContext.Provider value={values}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export { CurrentUserContext, CurrentUserProvider };
