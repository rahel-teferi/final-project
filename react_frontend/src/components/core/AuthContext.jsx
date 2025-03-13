import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLogged(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLogged(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
