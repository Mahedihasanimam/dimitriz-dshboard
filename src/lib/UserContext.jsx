

import React, { createContext, useState, useEffect } from "react";


// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  

  useEffect(() => {
    // Retrieve token from localStorage if available
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token"); // removeItem the token cookie
  
  };

  const setTokenCookie = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // Set cookie with 7-day expiration
  };

  return (
    <UserContext.Provider value={{ token, setToken: setTokenCookie, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
