import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface UserContextData {
  user: object,
  setNewUser: (user) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
  const [user, setUser] = useState({});
  
  function setNewUser(user: object) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{
        user,
        setNewUser
      }}>
      {children}
    </UserContext.Provider>
  )
}