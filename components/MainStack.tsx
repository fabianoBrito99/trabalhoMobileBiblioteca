import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./BottomNav";
import BookDetailScreen from "../screens/ConsultarLivroScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator id="MainStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}
