import { createContext } from "react";
import { useState } from "react";
import users from "../schemas/users.json";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(users[0]);

  const login = (userData) => {
    setUser(userData);
    window.localStorage.setItem("session", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.setItem("session", null);
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
