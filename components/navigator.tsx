import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/context";
import AuthStack from "./authStack";
import MainStack from "./MainStack";

export default function AppNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
