import { createContext, ReactNode, useContext, useState } from "react";
import fetchUser from "@services/fetchUser";
import type { User } from "../types/User";

type ContextProps = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const Context = createContext({} as ContextProps);

type ProviderProps = {
  children: ReactNode;
};

export const useUserContext = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("userContext must be used within a UserProvider");
  }
  
  return context;
};

const UserProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<null | User>(null);

  const login = async () => {
    const data = await fetchUser();
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Context.Provider value={{ user, login, logout }}>
      {children}
    </Context.Provider>
  );
};

export default UserProvider;
