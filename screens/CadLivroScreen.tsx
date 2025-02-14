import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Platform, ScrollView } from "react-native";
import { createLivro } from "../services/livro"; 
import * as ImagePicker from 'expo-image-picker'; 
import * as FileSystem from 'expo-file-system'; 


interface CadLivroScreenProps {
  navigation: any;
}

const CadLivroScreen: React.FC<CadLivroScreenProps> = ({ navigation }) => {
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookGenre, setNewBookGenre] = useState("");
  const [newBookYear, setNewBookYear] = useState("");
  const [newBookDescription, setNewBookDescription] = useState("");
  const [newBookPages, setNewBookPages] = useState("");
  const [bookCover, setBookCover] = useState<any>(null); // Armazenar a foto da capa
  const [newBookStock, setNewBookStock] = useState("");

  const handleCreateLivro = useCallback(async () => {
    if (!newBookTitle.trim()) {
      Alert.alert("Atenção", "O título do livro não pode ser vazio.");
      return;
    }

    try {
      const newBook = await createLivro(
        newBookTitle.trim(),
        newBookAuthor.trim(),
        newBookGenre.trim(),
        newBookYear.trim(),
        newBookDescription.trim(),
        newBookPages.trim(),
        bookCover,
        newBookStock.trim(),
      );
      Alert.alert("Sucesso", "Livro cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar livro:", error);
      Alert.alert("Erro", "Não foi possível criar o livro.");
    }
  }, [newBookTitle, newBookAuthor, newBookGenre, newBookYear, newBookDescription, newBookPages, bookCover, newBookStock]);

 
  const getPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para selecionar uma imagem.");
      return false;
    }
    return true;
  };
  
  const pickImage = async () => {
    const hasPermission = await getPermissions();
    if (!hasPermission) return;
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      console.log("Imagem URI:", result.assets[0].uri);
  
      try {
        const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setBookCover(`data:image/jpeg;base64,${base64Image}`);
      } catch (error) {
        console.error("Erro ao converter imagem:", error);
      }
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Livro</Text>
      <TextInput
        style={styles.input}
        placeholder="Título do livro"
        value={newBookTitle}
        onChangeText={setNewBookTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={newBookAuthor}
        onChangeText={setNewBookAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Gênero"
        value={newBookGenre}
        onChangeText={setNewBookGenre}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano de Publicação"
        value={newBookYear}
        onChangeText={setNewBookYear}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={newBookDescription}
        onChangeText={setNewBookDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade de Páginas"
        value={newBookPages}
        onChangeText={setNewBookPages}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade em Estoque"
        value={newBookStock}
        onChangeText={setNewBookStock}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Selecionar Foto da Capa</Text>
      </TouchableOpacity>
      {bookCover && <Image source={{ uri: bookCover }} style={styles.imagePreview} />}
      <TouchableOpacity style={styles.button} onPress={handleCreateLivro}>
        <Text style={styles.buttonText}>Cadastrar Livro</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: 100,
    height: 150,
    marginVertical: 10,
    alignSelf: "center",
  },
});

export default CadLivroScreen;
