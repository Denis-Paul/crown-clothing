import { createContext, useState } from 'react';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // [value, setter]
    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider> // component that will wrap around any other components that will need access to the values from UserContext
};