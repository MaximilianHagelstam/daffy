import React, { ReactNode, useEffect, useState } from "react";
import User from "../interfaces/User";
import UserService from "../services/UserService";

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = React.createContext<User | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    UserService.getCurrentUser().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
