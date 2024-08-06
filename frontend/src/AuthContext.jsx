

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [redirectPath, setRedirectPath] = useState('/');

    const login = (username) => {
        setUser(username);
    };

    const logout = () => {
        setUser(null);
        setRedirectPath('/');
    };

    const setLastVisitedPage = (path) => {
        setRedirectPath(path);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, redirectPath, setLastVisitedPage }}>
            {children}
        </AuthContext.Provider>
    );
};
