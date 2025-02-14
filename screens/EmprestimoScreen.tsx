import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useUser } from "../context/usuarioContext";

interface Emprestimo {
  id_emprestimo: number;
  nome_livro: string;
  data_devolucao: string | null;
}

export default function EmprestimoScreen() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useUser();

  useEffect(() => {
    const fetchEmprestimos = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `http://192.168.1.4:4000/api/emprestimos/${userId}`
        );
        const data = await response.json();

        if (data.dados && Array.isArray(data.dados)) {
          setEmprestimos(data.dados);
        } else {
          setEmprestimos([]); // Evita erro caso os dados venham inesperados
          Alert.alert("Erro", "Nenhum empréstimo encontrado.");
        }
      } catch (error) {
        Alert.alert("Erro", "Falha ao buscar os dados do empréstimo.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmprestimos();
  }, [userId]);

  const devolverLivro = async (idEmprestimo: number) => {
    try {
      const response = await fetch(
        `http://192.168.1.4:4000/api/emprestimos/${idEmprestimo}/devolver`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (data.mensagem) {
        Alert.alert("Quase lá", "vai até a biblioteca com o livro e apresente o codigo: 'COD123' para a devolução!");
        setEmprestimos((prevEmprestimos) =>
          prevEmprestimos.map((emprestimo) =>
            emprestimo.id_emprestimo === idEmprestimo
              ? {
                  ...emprestimo,
                  data_devolucao: new Date().toISOString().split("T")[0],
                }
              : emprestimo
          )
        );
      } else {
        Alert.alert("Erro", data.erro || "Erro ao devolver o livro.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível devolver o livro.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6200EE" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Empréstimos</Text>

      {emprestimos.length === 0 ? (
        <Text style={styles.noEmprestimos}>Nenhum empréstimo encontrado</Text>
      ) : (
        <FlatList
          data={emprestimos}
          keyExtractor={(item) =>
            item.id_emprestimo
              ? item.id_emprestimo.toString()
              : Math.random().toString()
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.bookTitle}>{item.nome_livro}</Text>
              <Text>
                Data de Devolução:{" "}
                {item.data_devolucao ? item.data_devolucao : "Não devolvido"}
              </Text>

              {/* Se o livro ainda não foi devolvido, exibir botão de devolução */}
              {!item.data_devolucao && (
                <TouchableOpacity
                  style={styles.devolverButton}
                  onPress={() => devolverLivro(item.id_emprestimo)}
                >
                  <Text style={styles.buttonText}>Devolver Livro</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  noEmprestimos: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
  },
  bookTitle: { fontSize: 18, fontWeight: "bold" },
  devolverButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
