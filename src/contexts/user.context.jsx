import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocFromAuth } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // [value, setter]
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user);
            if (user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user); // sign-in = user obj / sign-out = null
        });

        return unsubscribe;
    }, []); // [] - empty dependency array

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider> // component that will wrap around any other components that will need access to the values from UserContext
};