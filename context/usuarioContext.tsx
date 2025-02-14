import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserContextType = {
  userId: number | null;
  saveUserId: (id: number) => Promise<void>;
  clearUser: () => {};
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  

  useEffect(() => {
    const loadUserId = async () => {
      const storedId = await AsyncStorage.getItem("userId");
      if (storedId) {
        setUserId(parseInt(storedId, 10));
      }
    };
    loadUserId();
  }, []);

  const saveUserId = async (id: number) => {
    setUserId(id);
    await AsyncStorage.setItem("userId", id.toString());
  };

  const clearUser = async () => {
    setUserId(null);
    await AsyncStorage.removeItem("userId");
  };

  return (
    <UserContext.Provider value={{ userId, saveUserId, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
