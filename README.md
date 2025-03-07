# 📚 Mobile Biblioteca

## 🚀 Guia de Execução

O APK funciona online, com o banco de dados **MySQL** hospedado na **Railway** e a API em **Node.js** rodando no **Render**. No entanto, é possível executar o projeto localmente para testes.

Para rodar o projeto localmente, siga os passos abaixo:

pegue o código de banco de dados e execute na maquina

[pasta banco de dados](/bancoDeDaodos/banco%20de%20dados.sql)


altere a base da url para o ip da maquina ou local host:

[base url da api](/config-rota-api/config.ts)

Instale as dependências
```bash
npm install
```
Inicie o aplicativo mobile

```bash
npm start
```

Navegue até a pasta da API
```bash
cd api
```
Instale as dependências da API
```bash
npm install
```

Inicie o servidor da API
```bash
npm run dev
```


# Sobre o Projeto
O Mobile Biblioteca é um aplicativo desenvolvido para facilitar a consulta e o gerenciamento de livros em uma biblioteca. Ele permite aos usuários ver os livros disponíveis, visualizar informações detalhadas e gerenciar empréstimos diretamente pelo aplicativo.

A aplicação se comunica com uma API backend hospedada no Render, onde estão armazenados os dados sobre os livros, usuários e transações. O banco de dados também está rodando na infraestrutura do Render, garantindo a persistência das informações e a escalabilidade do sistema.

# Tecnologias Utilizadas
- Frontend: React Native com Expo
- Backend: Node.js com Express
- Banco de Dados: MySQL na Railway
- Hospedagem da API: Render