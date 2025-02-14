import React from "react";
import { AuthProvider, useAuth } from "./context/context";
import AppNavigator from "./components/navigator";
import { UserProvider } from "./context/usuarioContext";

export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </UserProvider>
  );
}
