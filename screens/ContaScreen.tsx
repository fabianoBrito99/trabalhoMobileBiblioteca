import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useUser } from "../context/usuarioContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./LoginScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../context/context";

const ContaScreen: React.FC = () => {
  const { userId, clearUser } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Conta">>();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `http://192.168.1.4:4000/api/usuario/${userId}`
        );
        const data = await response.json();
        if (data.usuario) {
          setUserData(data.usuario);
        } else {
          Alert.alert("Erro", "Usuário não encontrado.");
        }
      } catch (error) {
        Alert.alert("Erro", "Falha ao buscar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#6200EE" />;
  }

  const handleLogout = () => {
    clearUser(); // Limpar o usuário
    navigation.navigate("Login")
    
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <>       
          <Text>Nome: {userData.nome_usuario}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Telefone: {userData.telefone}</Text>
          <Text>CEP: {userData.cep}</Text>
          <Text>Rua: {userData.rua}</Text>
          <Text>Cidade: {userData.cidade}</Text>
          <Text>Estado: {userData.estado}</Text>
          <Text>Bairro: {userData.bairro}</Text>
          <Text>Número: {userData.numero}</Text>

          <Button title="Sair" onPress={handleLogout} />
        </>
      ) : (
        <Text>Nenhum usuário encontrado.</Text>
      )}

    </View>
  );
};

export default ContaScreen;


const styles = StyleSheet.create({
    container: {
      width:300,
      height:600,
      display: "flex",
      margin: "auto",
      marginBottom: 90,
      justifyContent: "center",
      backgroundColor: "#fdf8e2",
      fontWeight: "700",
      borderRadius: 20,
      

    }});
