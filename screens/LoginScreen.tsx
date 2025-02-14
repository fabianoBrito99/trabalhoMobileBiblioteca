import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import login from "../services/login";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../context/context";
import { useUser } from "../context/usuarioContext";

export type RootStackParamList = {
  Login: undefined;
  Home: { usuario: any };
  Register: undefined;
  Conta: undefined;
};
interface LoginResponse {
  ok: boolean;
  data?: { id_usuario: number; nome_usuario: string };
  error?: string;
}


const LoginScreen: React.FC = () => {
  const { saveUserId } = useUser();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Login">>();
  const { setIsLoggedIn } = useAuth(); // 

  const handleLogin = async () => {
    console.log("Iniciando o processo de login...");
    try {
      const response: LoginResponse = await login({}, { username, password });
  
      console.log("Login bem-sucedido:", response);
  
      if (response.ok && response.data?.id_usuario) { 
        Alert.alert("Login bem-sucedido!");
  
        await saveUserId(response.data.id_usuario); 
        setIsLoggedIn(true);
  
        navigation.replace("Home");
      } else {
        Alert.alert("Erro ao fazer login", response.error || "ID do usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro ao fazer login", "Erro desconhecido");
    }
  };
  
  

  return (
    <View style={styles.container}>
  
      <Image 
      source={require("../assets/icon.png")}
      style ={styles.foto}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="username"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.naoConta}>Ainda não tem uma conta?</Text>
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    width:300,
    maxHeight:440,
    borderRadius:10,
    borderColor: "#000",
    borderWidth: 2,
    margin: "auto",
    backgroundColor: "#fdf8e2",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  button: {
    height: 50,
    backgroundColor: "#fcdd9d",
    justifyContent: "center",
    borderColor: "#B8860B",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#03DAC6",
    borderColor: "#fff",
  },
  buttonText: {
    color: "#363636",
    fontSize: 16,
    fontWeight: "bold",
  },
  naoConta: {
    textAlign: "center",
    paddingTop: 20,
  },
  foto:{
    zIndex:100,
    width:100,
    height:100,
    position: "absolute",
    left: 99,
    top: -90,


  },
});

export default LoginScreen;
