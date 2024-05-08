import React, { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setLoggedInUser(user ? user : null);
    });

    
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;