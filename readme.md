# Agenda de Contatos - MMTECH

![Capa do Projeto](https://cdn.discordapp.com/attachments/691101774471233567/1393292258434089082/image.png?ex=6872a408&is=68715288&hm=d8b3879ac66f072abe1eb26cf5e0b7a2116fdc594118e68a2f397649b99a7db3&)

## Sobre o Projeto

Este é um projeto desenvolvido como parte do desafio técnico para a vaga de desenvolvedor na MMTECH. A aplicação é uma agenda de contatos completa, construída como uma Single Page Application (SPA), com frontend em React e um backend em Node.js.

O objetivo foi criar uma interface moderna, intuitiva e responsiva, focando na experiência do usuário e na qualidade do código, indo além dos requisitos básicos do CRUD.

---

## Funcionalidades Principais

- **CRUD Completo:** Crie, leia, atualize e delete contatos de forma persistente.
- **Busca Global:** Pesquise contatos em tempo real por qualquer campo (nome, email, telefone ou setor).
- **Filtro por Setor:** Filtre a visualização de contatos por setor com um dropdown interativo.
- **Design Responsivo:** A interface se adapta perfeitamente a desktops, tablets e celulares.
- **UX Refinada:**
    - Cards de contato expansíveis para uma interface limpa.
    - Modal com efeito "Neon Glow" para adição e edição, mantendo o usuário no contexto da aplicação.
    - Botões para copiar email e telefone com um clique.
    - Animações sutis e feedback visual para o usuário.
- **Máscara de Input:** Formatação automática para números de telefone.

---

## Tecnologias Utilizadas

**Backend:**
- **Node.js:** Ambiente de execução do servidor.
- **Express.js:** Framework para a criação da API.
- **NeDB:** Banco de dados leve baseado em arquivos.
- **CORS:** Para permitir a comunicação entre frontend e backend.

**Frontend:**
- **React.js:** Biblioteca para a construção da interface.
- **React Hooks:** (useState, useEffect, useRef) para gerenciamento de estado e ciclo de vida.
- **react-imask:** Para a máscara de input do telefone.
- **CSS3:** Estilização customizada com Flexbox, Grid Layout e Media Queries para responsividade.
- **Font Awesome:** Para os ícones da interface.

---

## Como Rodar o Projeto

Para executar este projeto localmente, siga os passos abaixo.

**Pré-requisitos:**
- [Node.js](https://nodejs.org/en/) instalado.

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/miguelplaviak/desafio-mmtech
    cd mmtech-desafio
    ```

2.  **Instale as dependências do Backend:**
    ```bash
    cd server
    npm install
    ```

3.  **Instale as dependências do Frontend:**
    ```bash
    cd ../client/client 
    npm install
    ```

4.  **Execute os dois servidores:**
    - Em um terminal, na pasta `server`, rode o backend:
      ```bash
      node index.js
      ```
    - Em **outro** terminal, na pasta `client/client`, rode o frontend:
      ```bash
      npm start
      ```

5.  Abra seu navegador e acesse `http://localhost:3000`.

---

## Desafios e Aprendizados

Um dos principais desafios neste projeto foi garantir que a interface se mantivesse fluida e responsiva, mesmo com as animações de expansão dos cards. Foi um ótimo exercício de CSS Grid e de gerenciamento de estado no React.

Este projeto foi uma excelente oportunidade para aprofundar meus conhecimentos na criação de uma API RESTful completa com Node.js e na construção de um frontend reativo e bem estruturado com React Hooks.

## Autor

**Miguel Antonio Plaviak**

- [LinkedIn](https://www.linkedin.com/in/miguel-antonio-p-411216243/)
- [GitHub](https://github.com/miguelplaviak)
