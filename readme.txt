QUANTIC VISION - GUIA DE CONFIGURAÇÃO LOCAL
==========================================

Este projeto utiliza React (Vite) no frontend e Firebase como Backend-as-a-Service.
Não é necessário utilizar XAMPP, pois o Firebase substitui a necessidade de um servidor PHP/MySQL local.

1. PRÉ-REQUISITOS
-----------------
* Node.js (v18 ou superior)
* Uma conta no Firebase (console.firebase.google.com)

2. CONFIGURAÇÃO DO FIREBASE
---------------------------
Para que o login e outras funcionalidades funcionem, você deve:

A. No Console do Firebase:
   1. Crie um novo projeto.
   2. Ative a 'Authentication' no menu lateral.
   3. Clique em 'Método de login' e ative 'E-mail/senha'.
   4. Ative o 'Firestore Database' e as 'Cloud Storage' se necessário.

B. No Código (Local):
   1. Localize o arquivo `firebase-applet-config.json` na raiz do projeto.
   2. Substitua as credenciais (apiKey, authDomain, etc) pelas do seu projeto do Firebase.
   3. Você encontra essas chaves em: Configurações do Projeto > Geral > Seus Aplicativos > Configuração do SDK.

3. EXECUTANDO O PROJETO
-----------------------
Abra o terminal na pasta do projeto e execute:

   npm install    # Instala as dependências
   npm run dev    # Inicia o servidor de desenvolvimento

O site estará disponível em http://localhost:3000

4. LIMPEZA E MANUTENÇÃO (CLEAN CODE)
------------------------------------
* Componentização: Os elementos estão divididos em /components para facilitar a reutilização.
* Context API: A autenticação é gerida centralmente em /contexts/AuthContext.
* Tailwind CSS: Estilização rápida e consistente sem arquivos CSS espalhados.

Para suporte técnico, contacte o engenheiro responsável.
