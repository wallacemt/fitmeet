# FITMEET - Backend

![License](https://img.shields.io/static/v1?label=license&message=MIT&color=orange) &nbsp;
![Cargo version](https://img.shields.io/static/v1?label=cargo&message=v0.1.0&color=yellow) &nbsp;
![Pull request](https://img.shields.io/static/v1?label=PR&message=welcome&color=green)

## Indices

- [`Sobre o Projeto`](#sobre-o-projeto)
- [`Tecnologias Utilizadas`](#tecnologias-utilizadas)
- [`Estrutura do Projeto`](#estrutura-projeto)
- [`Configuração é Execução`](#configuracao-execucao)
- [`Principais Endpoints`](#endpoints)
- [`Autenticação é Segurança`](#autenticacao)
- [`Banco de Dados`](#database)
- [`Contribuições`](#contribuicoes)
- [`Licença`](#license)

<span id="sobre-o-projeto"></span>

## 📌 Sobre o Projeto

O **FITMEET** é uma plataforma para gestão de atividades físicas, onde os usuários podem criar e se inscrever em atividades, além de acompanhar seu progresso com um sistema de **XP (experiência)** e **conquistas**. Ele também oferece funcionalidades de **autenticação**, **notificações em tempo real** e **seguimento de atividades**, criando uma experiência interativa e envolvente para os usuários.

## 🚀 Tecnologias Utilizadas

<div align='center' id="tecnologias-utilizadas">
    <img align='center' height='49' width='49' title='Express' alt='Express' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' /> &nbsp;
    <img align='center' height='49' width='49' title='TypeScript' alt='TypeScript' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' /> &nbsp;
    <img align='center' height='49' width='49' title='Jest' alt='Jest' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg' /> &nbsp;
    <img align='center' height='49' width='49' title='Prisma' alt='Prisma' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg' /> &nbsp;
    <img align='center' height='49' width='49' title='JWT' alt='JWT' src='https://cdn.worldvectorlogo.com/logos/jwt-3.svg'/> &nbsp;
   <img align='center' height='49' width='49' title='Dotenv' alt='dotenv' src='https://github.com/bush1D3v/navarro_blog_api/assets/133554156/de030e87-8f12-4b6b-8c75-071bab8526a5' /> &nbsp;
   <img align='center' height='50' width='50' title='Cors' alt='cors' src='https://github.com/bush1D3v/navarro_blog_api/assets/133554156/5dcd815b-e815-453b-9f3f-71e7dbcdf71d' />
   <img align='center' height='60' width='70' title='Swagger' alt='swagger' src='https://github.com/bush1D3v/tsbank_api/assets/133554156/6739401f-d03b-47f8-b01f-88da2a9075d1' />
   <img align='center' height='70' width='70' title='Docker' alt='docker' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' /> &nbsp;
   <img align='center' height='48' width='48' title='Bcrypt' alt='bcrypt' src='https://github.com/bush1D3v/navarro_blog_api/assets/133554156/8d9137f8-cd85-4629-be08-c639db52088d' /> &nbsp;
    <img align='center' height='48' width='48'  title='Postman' alt='Postman' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' /> &nbsp;
   <img align='center' height='48' width='48'  title='Oauth' alt='Oauth' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-original.svg' /> &nbsp;
   <img align='center' height='48' width='48'  title='Nodemon' alt='Nodemon' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodemon/nodemon-original.svg' /> &nbsp;
   
   
</div>

<span id="estrutura-projeto"></span>

## 📂 Estrutura do Projeto

```
backend/
│-- prisma
│-- src/
│   ├── controllers
│   ├── images
│   ├── middlewares
│   ├── multer
│   ├── prisma
│   ├── repository
│   ├── services
│   ├── tests
│   ├── types
│   ├── utilis
│   ├── index.ts
│   ├── swagger.json
│-- docker-compose.yml
│-- package.json
│-- tsconfig.json
│-- jest.config.json
│-- Dockerfile
│-- .env
│-- README.md
│-- LICENSE
```

<span id="configuracao-execucao"></span>

## 🛠️ Configuração e Execução

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/bc-fullstack-06/Wallace-de-Jesus-Santana
cd Wallace-de-Jesus-Santana/backend
```

### 2️⃣ Rodar a Aplicação

O projeto utiliza **Docker**. Para subir a imagem da API rode:
```bash
docker compose up -d
```
### 3️⃣ 
Acesse a documentação para ver as rotas disponiveis.

```bash
http://localhost:3000/docs
```

<span id="endpoints"></span>

## 📌 Endpoints Principais

A API está documentada no **Swagger** é **Postman**. Você pode importar a coleção utilizando o arquivo `fitmeet-api.json` incluído no projeto ou acessar.

```bash
http://localhost:3000/docs
```

### 🔑 Autenticação

- `POST /auth/sign-in` - Realiza o login e retorna um token JWT
- `POST /auth/register` - Cria um novo usuário

### 👤 Usuários (Protegida)

- `GET /user` - Retorna informações do usuário logado.
- `PUT /user/update` - Atualiza os dados do usuario.

### 📋 Atividades (Protegida)

- `GET /activities` - Lista todas as atividades com paginação.
- `POST /activities/new` - Cria uma nova atividade.



<span id="autenticacao"></span>

## 🔒 Autenticação e Segurança

A API utiliza **JWT** para autenticação. Para acessar rotas protegidas, adicione o token no cabeçalho:

```plaintext
Authorization: Bearer <seu_token>
```

<span id="database"></span>

## 🗂️ Banco de Dados

### Diagrama Do Banco:

<div align='center'>
   <img align='center' height='750' width='800' style="border-radius:1.5rem"  title='BD' alt='BD' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1743374375/bootcamp_-_public_zrkum8.png' /> &nbsp;
</div>

<span id="contribuicoes"></span>

## 🛠 Contribuição

Ficou interessado em contribuir? Faça um **fork** do repositório, crie uma **branch**, implemente a melhoria e envie um **pull request**. Toda ajuda é bem-vinda!

1. **Fork the repository.**
2. **Clone your forked repository to your local machine.**
3. **Create a branch for your feature or fix:**

   ```bash
   git checkout -b my-new-feature
   ```

4. **Commit your changes:**

   ```bash
   git commit -m 'Add new feature'
   ```

5. **Push your changes to your fork:**

   ```bash
   git push origin my-new-feature
   ```

6. **Create a Pull Request.**

<span id="license"></span>

## 📜 Licença

`Este projeto está sob a licença MIT.`
