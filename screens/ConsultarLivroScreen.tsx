import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getLivroDetalhes } from "../services/livro"; // Assumindo que esta função já existe para buscar os dados do livro
import { useUser } from "../context/usuarioContext";
import API_BASE_URL from "../config-rota-api/config";

const BookDetailScreen = ({ route }) => {
  const { livroId } = route.params;
  const [livro, setLivro] = useState(null);
  const { userId } = useUser();

  // Função para buscar os detalhes do livro
  useEffect(() => {
    const fetchLivroDetalhes = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/livro/${livroId}`
        );
        const data = await response.json();
        setLivro(data); // Ajuste se necessário
      } catch (error) {
        console.error("Erro ao carregar os detalhes do livro:", error);
        Alert.alert("Erro", "Não foi possível carregar os detalhes do livro.");
      }
    };

    fetchLivroDetalhes();
  }, [livroId]);

  // Função que faz a reserva do livro
  const reservar = async (livroId) => {
    if (!userId) {
      Alert.alert("Erro", "Usuário não está logado.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/emprestimos/${livroId}/reservar`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuarioId: userId }),
        }
      );

      const text = await response.text();
      console.log("Resposta da API:", text);

      const data = JSON.parse(text);
      console.log("JSON convertido:", data);

      if (data.mensagem) {
        Alert.alert("Reserva Confirmada", "O livro foi reservado com sucesso.");
      } else {
        Alert.alert("Erro", data.erro || "Erro ao reservar o livro.");
      }
    } catch (error) {
      console.error("Erro ao reservar o livro:", error);
      Alert.alert("Erro", "Não foi possível reservar o livro.");
    }
  };

  // Função para reservar o livro
  const reservarLivro = () => {
    Alert.alert(
      "Confirmar Reserva",
      "Tem certeza que deseja reservar este livro?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => reservar(livroId) },
      ]
    );
  };

  // Se o livro não for carregado ainda
  if (!livro) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: livro.foto_capa }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{livro.nome_livro}</Text>
      <Text style={styles.bookDescription}>{livro.descricao}</Text>
      <Text style={styles.bookAuthor}>
        Autor: {livro.nome_autor ?? "Desconhecido"}
      </Text>
      <Text style={styles.bookPages}>Páginas: {livro.quantidade_paginas}</Text>
      <Text style={styles.bookYear}>
        Ano de publicação: {livro.ano_publicacao}
      </Text>
      <Text style={styles.bookCategory}>Categoria: {livro.categoria}</Text>

     
      <TouchableOpacity
        style={[
          styles.reserveButton,
          livro.quantidade_estoque === 0
            ? { backgroundColor: "red" }
            : { backgroundColor: "green" },
        ]}
        onPress={reservarLivro}
        disabled={livro.quantidade_estoque === 0}
      >
        <Text style={styles.buttonText}>
          {livro.quantidade_estoque === 0 ? "Indisponível" : "Reservar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bookImage: {
    width: 200,
    height: 300,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  bookDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    textAlign: "center",
  },
  bookAuthor: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  bookPages: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  bookYear: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  bookCategory: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  reserveButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookDetailScreen;
