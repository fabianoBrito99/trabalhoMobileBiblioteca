import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TabMenuProps = {
  screen: "Home" | "Cadastrar Livro" | "Empréstimos" | "Conta";
  focused: boolean;
};

const TabMenu = ({ screen, focused }: TabMenuProps) => {
  let iconName: keyof typeof Ionicons.glyphMap = "home";
  if (screen === "Home") iconName = "home";
  else if (screen === "Cadastrar Livro") iconName = "book-outline";
  else if (screen === "Empréstimos") iconName = "library-outline";
  else if (screen === "Conta") iconName = "person-outline";

  return (
    <View style={focused ? styles.highlightedButtonOutside : styles.buttonContainer}>
      <View style={focused ? styles.highlightedButton : styles.defaultButton}>
        <Ionicons name={iconName} size={24} color={focused ? "#000" : "#808080"} />
      </View>
    </View>
  );
};

export default React.memo(TabMenu);

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  defaultButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    bottom:15,
  },
  highlightedButtonOutside: {
    position: "absolute",
    top: -90,
    padding: 30,
    borderRadius: 100,
  },
  highlightedButton: {
    width: 50, 
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#FFE4B5",
    elevation: 10,
  },
});
