import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { getLivros } from "../services/livro"; // Função para buscar livros

type Livro = {
  id_livro: number;
  nome_livro: string;
  quantidade_paginas: number | null;
  descricao: string | null;
  foto_capa: string | null;
  ano_publicacao: number | null;
  categoria: string;
  autor: string | null;
};

interface HomeScreenProps {
  route: { params: { token: string } };
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const [books, setBooks] = useState<Livro[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getLivros(); // Buscar livros da API
        setBooks(data.livros); // Certifique-se de acessar a chave "livros"
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
        Alert.alert("Erro", "Não foi possível carregar os livros.");
      }
    };
    fetchBooks();
  }, []);

  // Agrupar livros por categoria
  const livrosPorCategoria = books.reduce((acc, livro) => {
    const categoria = livro.categoria || "Sem categoria"; // Evitar undefined
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(livro);
    return acc;
  }, {} as Record<string, Livro[]>);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Livros</Text>

      {books.length === 0 ? (
        <Text style={styles.noBooks}>
          Não há livros disponíveis no momento.
        </Text>
      ) : (
        Object.entries(livrosPorCategoria).map(([categoria, livros]) => (
          <View key={categoria}>
            <Text style={styles.categoryTitle}>{categoria}</Text>
            <FlatList
              data={livros}
              horizontal
              keyExtractor={(item) => item.id_livro.toString()}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.bookCard}
                  onPress={() =>
                    navigation.navigate("BookDetail", {
                      livroId: item.id_livro,
                    })
                  }
                >
                  {item.foto_capa && (
                    <Image
                      source={{ uri: item.foto_capa }}
                      style={styles.bookImage}
                      onError={(e) =>
                        console.log(
                          "Erro ao carregar imagem:",
                          e.nativeEvent.error
                        )
                      }
                    />
                  )}
                  <Text style={styles.bookTitle}>{item.nome_livro}</Text>
                  <Text>{item.autor ?? "Autor desconhecido"}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fdf8e2",
    marginBottom: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  noBooks: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  bookCard: {
    backgroundColor: "#FFF",
    padding: 15,
    margin: 10,
    borderRadius: 8,
    width: 150,
    marginBottom: 10,
    alignItems: "center",
  },
  bookImage: {
    width: 100,
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
});

export default HomeScreen;
