import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  loggedIn: false,
});

const AuthProvider = (props: any) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const authContextValue = {
    login,
    loggedIn,
    logout,
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
