// user context

import React, {createContext, useState} from 'react';

const UserContext = createContext(null);

function getUserFromLocalStorage() {
    const local = localStorage.getItem('user');
    return local ? JSON.parse(local) : {username: null, token: null};
}

const UserProvider = ({children}) => {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [showMessage, setShowMessage] = useState(null);
    const userLogin = user => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const userLogout = () => {
        localStorage.removeItem('user');
        setUser({username: null, token: null});
    };

    return (
        <UserContext.Provider value={{user, userLogin, userLogout, setShowMessage, showMessage}}>
            {children}
        </UserContext.Provider>
    )
};

export {UserProvider, UserContext};
