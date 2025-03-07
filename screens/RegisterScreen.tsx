import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import API_BASE_URL from "../config-rota-api/config";

// Definição dos tipos de navegação
type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

// Propriedades de navegação
type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [numero, setNumero] = useState("");

    // Função para buscar endereço via API do ViaCEP
    const buscarEnderecoPorCEP = async (cep: string) => {
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                
                if (data.erro) {
                    Alert.alert("Erro", "CEP não encontrado");
                    return;
                }
                
                setRua(data.logradouro);
                setBairro(data.bairro);
                setCidade(data.localidade);
                setEstado(data.uf);
            } catch (error) {
                Alert.alert("Erro", "Não foi possível buscar o endereço");
            }
        }
    };

    const handleRegister = async () => {
        try {
            const usuarioData = {
                nome_usuario: username,
                email: email,
                senha: password,
                telefone: telefone,
                cep: cep,
                rua: rua,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                numero: numero,
            };

            const response = await fetch(`${API_BASE_URL}/api/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioData),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Sucesso", "Usuário registrado com sucesso!");
                navigation.navigate("Login");
            } else {
                throw new Error(data.error || "Erro desconhecido");
            }
        } catch (error: unknown) {
            console.log("Erro no registro:", error);
            Alert.alert("Erro ao registrar", (error as Error).message || "Erro desconhecido");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar</Text>
            <TextInput style={styles.input} placeholder="Nome de usuário" value={username} onChangeText={setUsername} autoCapitalize="none" autoCorrect={false} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false} />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} autoCapitalize="none" autoCorrect={false} />
            <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} autoCapitalize="none" autoCorrect={false} />
            <TextInput style={styles.input} placeholder="CEP" value={cep} onChangeText={(text) => { setCep(text); buscarEnderecoPorCEP(text); }} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Rua" value={rua} onChangeText={setRua} autoCapitalize="none" autoCorrect={false} />
            <TextInput style={styles.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} autoCapitalize="none" autoCorrect={false} />
            <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} autoCapitalize="none" autoCorrect={false} />
            <TextInput style={styles.input} placeholder="Estado" value={estado} onChangeText={setEstado} autoCapitalize="characters" maxLength={2} />
            <TextInput style={styles.input} placeholder="Número" value={numero} onChangeText={setNumero} autoCapitalize="none" autoCorrect={false} />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Já tem uma conta? Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
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
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: "#2196F3",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
