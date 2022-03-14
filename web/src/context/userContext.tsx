import React, { ReactNode, useEffect, useState } from "react";
import Loading from "../components/Loading";
import User from "../interfaces/User";
import UserService from "../services/userService";

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = React.createContext<User | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setUser = async () => {
      const { data } = await UserService.getCurrentUser();

      setCurrentUser(data);
      setLoading(false);
    };

    setUser();
  }, []);

  if (loading) return <Loading />;

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
