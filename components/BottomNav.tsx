import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CadLivroScreen from "../screens/CadLivroScreen";
import EmprestimoScreen from "../screens/EmprestimoScreen";
import ContaScreen from "../screens/ContaScreen";
import TabMenu from "../components/TabMenu"; // Importando o componente personalizado
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabContainer,
        tabBarShowLabel: false, // Ocultando os rótulos
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabMenu screen="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Cadastrar Livro"
        component={CadLivroScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabMenu screen="Cadastrar Livro" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Empréstimos"
        component={EmprestimoScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabMenu screen="Empréstimos" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Conta"
        component={ContaScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabMenu screen="Conta" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#fcdd9d",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    alignItems: "center",
  },
});
