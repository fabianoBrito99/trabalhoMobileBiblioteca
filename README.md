# 📚 Mobile Biblioteca

## 🚀 Guia de Execução

De início o aplicativo pode demorar um pouco para fazer o processo de login e registrar por tá em uma api grátis com pouco recuso.

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
O App da Biblioteca nasceu da necessidade real enfrentada pela biblioteca da igreja onde congrego. Atualmente, todo o gerenciamento de empréstimos e registros de livros é feito manualmente em papel, o que dificulta a organização, aumenta a chance de erros e torna o processo pouco eficiente.

Diante desse problema, desenvolvi inicialmente um sistema web para automatizar a gestão da biblioteca, permitindo um controle mais eficiente e organizado. No entanto, esse trabalho de mobile vi uma oportunidade de testar como seria as funcionalidades no mobile e até porque hoje em dia todo mundo tem um celular e talvez seria interresante um aplicativo do que um sistema web.

O objetivo principal dessa versão é avaliar a viabilidade de migrar totalmente para um sistema mobile ou, pelo menos, integrar funcionalidades que melhorem a experiência dos usuários, como consulta rápida ao acervo, notificações sobre devoluções e histórico de empréstimos diretamente pelo celular.

Ataulmente esse apk mobile está funcionando assim: O Aplicativo se comunica com uma API backend hospedada no **Render**, onde estão armazenados os dados sobre os livros, usuários e emprestimos. O banco de dados está rodando na infraestrutura da **railway**, garantindo a persistência das informações e a escalabilidade do sistema.

# Tecnologias Utilizadas
- Frontend: React Native com Expo
- Backend: Node.js com Express
- Banco de Dados: MySQL na Railway
- Hospedagem da API: Render
