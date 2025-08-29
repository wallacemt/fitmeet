# 🏃‍♀️ FitMeet - Fullstack

![License](https://img.shields.io/static/v1?label=license&message=MIT&color=orange) &nbsp;
![Version](https://img.shields.io/static/v1?label=version&message=1.0.0&color=yellow) &nbsp;
![PRs](https://img.shields.io/static/v1?label=pull%20requests&message=welcome&color=green)

## Índices

- [`Sobre o Projeto`](#sobre-o-projeto)
- [`Tecnologias Utilizadas`](#tecnologias-utilizadas)
- [`Estrutura do Projeto`](#estrutura-do-projeto)
- [`Configuração e Execução`](#configuração-e-execução)
- [`Capturas das Telas`](#capturas)
- [`Principais Funcionalidades`](#principais-funcionalidades)
- [`Contribuições`](#contribuições)
- [`Licença`](#licença)

<span id="sobre-o-projeto"></span>

## 📌 Sobre o Projeto

O **FitMeet** é uma plataforma social que conecta pessoas por meio de atividades esportivas. Com uma pegada leve e colaborativa, os usuários podem criar eventos, se inscrever em atividades esportivas, acompanhar sua evolução por conquistas e níveis, e conhecer pessoas com gostos similares.

Este repositório contém a aplicação completa: **Frontend (React)**, **Mobile (React Native)** e **Backend (Node.js + Express)**.

---

<span id="tecnologias-utilizadas"></span>

## 🚀 Tecnologias Utilizadas

<div style="display:flex; alignItems: center; justifyContent: center; flex-wrap:wrap;">
<img align='center' height='49' width='49' title='Vite' alt='Vite' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg'/> &nbsp;
<img height='40' title='React Native' alt='React Native' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'/> &nbsp;
<img align='center' height='49' width='49' title='Tailwind' alt='Tailwind' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'/> &nbsp;
<img align='center' height='49' width='49' title='TypeScript' alt='TypeScript' src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"/> &nbsp;
<img align='center' height='49' width='49' title='shadcn-ui'   style="border-radius: 50%;" alt='shadcn-ui' src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4"/> &nbsp;
<img align='center' height='49' width='49' title='zod'   style="border-radius: 50%;" alt='zod' src="https://files.svgcdn.io/logos/zod.png"/> &nbsp;
<img align='center' height='49' width='49' title='Dotenv' alt='dotenv' src='https://github.com/bush1D3v/navarro_blog_api/assets/133554156/de030e87-8f12-4b6b-8c75-071bab8526a5' /> &nbsp;
<img align='center' height='50' width='50' title='Cors' alt='cors' src='https://github.com/bush1D3v/navarro_blog_api/assets/133554156/5dcd815b-e815-453b-9f3f-71e7dbcdf71d' />
<img align='center' height='60' width='70' title='Swagger' alt='swagger' src='https://github.com/bush1D3v/tsbank_api/assets/133554156/6739401f-d03b-47f8-b01f-88da2a9075d1' />
<img align='center' height='70' width='70' title='Docker' alt='docker' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' /> &nbsp;
<img align='center' height='48' width='48' title='Bcrypt' alt='bcrypt' src='https://github.com/bush1D3v/navarro_blog_api/assets/133554156/8d9137f8-cd85-4629-be08-c639db52088d' /> &nbsp;
<img align='center' height='48' width='48'  title='Postman' alt='Postman' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' /> &nbsp;
<img align='center' height='48' width='48'  title='Oauth' alt='Oauth' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-original.svg' /> &nbsp;
<img align='center' height='48' width='48'  title='Nodemon' alt='Nodemon' src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodemon/nodemon-original.svg' /> &nbsp;
</div>

<span id="estrutura-do-projeto"></span>

## 📂 Estrutura do Projeto

```
fitmeet/
├── backend/         # API REST com Node.js + Express + Prisma
├── frontend/        # Aplicação Web com React + Tailwind + Vite
├── mobile/          # Aplicação Mobile com React Native + Expo
└── README.md        # Documentação geral do projeto
```

<span id="configuração-e-execução"></span>

## 🛠️ Configuração e Execução

> ⚠️ Antes de começar, certifique-se de ter o **Node.js**, **npm** e o **Android Studio** instalados em sua máquina.

### 🔧 Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

### 💻 Mobile

```bash
cd mobile
npm install
npm run android
```

<span id="capturas"></span>

## 🖼️ Capturas de Tela

- ### Aréa de Login + Cadastro

  ## Web

    <div align='center'>
        <img style="border-radius:1.5rem"  title='login' alt='login' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1745950427/Captura_de_tela_2025-04-29_140133_udwebe.png' /> &nbsp;
        <img style="border-radius:1.5rem"  title='login' alt='cadastro' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1745950433/Captura_de_tela_2025-04-29_140158_wnikqd.png' /> &nbsp;
    </div>

  ## Mobile

    <div align='center'>
        <img style="border-radius:1.5rem"  title='login' alt='login' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1746563593/Captura_de_tela_2025-05-05_235512_evldfl.png' /> &nbsp;
        <img style="border-radius:1.5rem"  title='login' alt='cadastro' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1746563593/Captura_de_tela_2025-05-06_102939_si6ypi.png' /> &nbsp;
    </div>

- ### Feed De Atividades

<div align='center'>
    <img style="border-radius:1.5rem"  title='feed' alt='feed' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1745950430/Captura_de_tela_2025-04-29_140221_kwbbya.png' /> &nbsp;
</div>

- ### Perfil de Usuario + Edição de Perfil

<div align='center'>
    <img style="border-radius:1.5rem"  title='Profile' alt='Profile' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1745950426/Captura_de_tela_2025-04-29_140235_u9cqyc.png' /> &nbsp;
    <img style="border-radius:1.5rem"  title='EditProfile' alt='editProfile' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1745950426/Captura_de_tela_2025-04-29_140256_lhha6e.png' /> &nbsp;
</div>

- ### Modal de Criação de Atividade

<div align='center'>
    <img style="border-radius:1.5rem"  title='createModal' alt='createModal' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1745950424/Captura_de_tela_2025-04-29_140314_fijrti.png' /> &nbsp;
</div>

- ### Modal Para Participar de uma Atividade

<div align='center'>
    <img style="border-radius:1.5rem"  title='Participing' alt='Participing' src='https://res.cloudinary.com/dg9hqvlas/image/upload/v1745950425/Captura_de_tela_2025-04-29_140504_prjvm6.png' /> &nbsp;
</div>

<span id="principais-funcionalidades"></span>

# 📈 Principais Funcionalidades

_Abaixo estão algumas das principais funcionalidades do FitMeet:_

### 1. 🔐 Autenticação JWT

- Cadastro e login com autenticação JWT

- Cadastro com e-mail e CPF

- Login com autenticação JWT

- Confirmação de e-mail com código

- Sistema de 2FA e anti-brute-force

### 2. 🏃‍♂️ Atividades Esportivas

- Criação e inscrição em atividades

- Preferências por tipo de esporte

- Confirmação de presença

- Encerramento de atividades

### 3. 🧭 Localização e Mapa

- Visualização do ponto de encontro via mapa interativo

- Lista de participantes com avatares

### 4.🏆 Níveis, Conquistas e XP

- Ganho de XP por interação

- Subida de nível automática

- Desbloqueio de conquistas

### 5. 📰 Feed de Atividades

- Feed de atividades públicas e privadas

### 6. Animações e Responsividade

- 🎨 Animações fluidas e interface 100% responsiva

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
