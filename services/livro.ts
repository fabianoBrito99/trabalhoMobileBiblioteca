import * as FileSystem from "expo-file-system";
import API_BASE_URL from "../config-rota-api/config";

export const getLivros = async () => {
  const response = await fetch(`${API_BASE_URL}/livro`, {});
  const data = await response.json();
  return data;
  
};

export const getLivroDetalhes = async (livroId: number) => {
  const response = await fetch(`${API_BASE_URL}/livro/${livroId}`);
  const data = await response.json();
  return data;
};


export const createLivro = async (
  title: string,
  author: string,
  genre: string,
  year: string,
  description: string,
  pages: string,
  cover: any,
  stock: string
) => {
  const formData = new FormData();
  formData.append("nomeLivro", title);
  formData.append("descricao", description);
  formData.append("anoPublicacao", year);
  formData.append("quantidade_paginas", pages);
  formData.append("categoria_principal", genre);
  formData.append("autores", author);
  formData.append("quantidade_estoque", stock);

  if (cover) {
    try {
      const base64Image = await convertToBase64(cover);
      formData.append("foto_capa", base64Image); 
    } catch (error) {
      console.error("Erro ao converter imagem:", error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/livro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeLivro: title,
      descricao: description,
      anoPublicacao: year,
      quantidade_paginas: pages,
      categoria_principal: genre,
      autores: author,
      quantidade_estoque: stock,
      foto_capa: cover, // Base64 direto no JSON
    }),
  });
  

  const result = await response.json();
  
  if (response.ok) {
    return result; // Livro criado com sucesso
  } else {
    throw new Error(result.mensagem || "Erro ao cadastrar livro.");
  }
};

// Função para converter a imagem para base64
const convertToBase64 = async (uri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64}`; // Formato necessário para enviar ao backend
  } catch (error) {
    console.error("Erro ao converter imagem para base64", error);
    throw error;
  }
};

export const updateLivro = async (
  id: number,
  title: string,
  author: string,
  genre: string,
  year: string,
  token: string
) => {
  const response = await fetch(`${API_BASE_URL}/livro/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author, genre, year }),
  });
  return await response.json();
};

export const deleteLivro = async (id: number, token: string) => {
  await fetch(`${API_BASE_URL}/livro/${id}`, {
    method: "DELETE",
  });
};
