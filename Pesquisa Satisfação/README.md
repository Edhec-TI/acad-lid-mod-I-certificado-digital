# Projeto de Pesquisa de Satisfação

## Visão Geral

Esta é uma aplicação web robusta e moderna, desenvolvida para a coleta e análise de dados de pesquisas de satisfação. Construída com as tecnologias mais atuais, a plataforma oferece uma experiência de usuário fluida, um design elegante e uma base de código escalável e de fácil manutenção.

O projeto utiliza uma arquitetura front-end reativa com **React** e **TypeScript**, garantindo tipagem estática e um desenvolvimento mais seguro. A interface é construída com um sistema de design baseado em **Tailwind CSS** e componentes **shadcn/ui**, proporcionando uma UI consistente, acessível e totalmente personalizável.

A integração com **Supabase** como backend (BaaS) simplifica a gestão de banco de dados, armazenamento de arquivos e autenticação, permitindo um desenvolvimento ágil e focado na experiência do usuário.

**Autor:** [Fabio Costa](https://github.com/fabio-costa)

---

## Stack de Tecnologias

Este projeto foi construído utilizando um conjunto de ferramentas modernas e eficientes, focadas em performance e qualidade de desenvolvimento.

### **Core**
- **React 18**: Para a construção de interfaces de usuário reativas e componentizadas.
- **TypeScript**: Para um código mais robusto, legível e com menos bugs em tempo de execução.
- **Vite**: Como ferramenta de build e servidor de desenvolvimento, oferecendo Hot Module Replacement (HMR) instantâneo.

### **UI & Estilização**
- **Tailwind CSS**: Framework CSS utility-first para a criação de designs customizados de forma rápida.
- **shadcn/ui**: Coleção de componentes de UI reutilizáveis, acessíveis e estilizados.
- **Lucide React**: Biblioteca de ícones SVG, leve e customizável.

### **Gerenciamento de Estado e Dados**
- **TanStack Query (React Query)**: Para fetching, caching e sincronização de dados do servidor de forma eficiente.
- **Supabase Client**: SDK para interação direta e segura com o backend Supabase.

### **Formulários**
- **React Hook Form**: Para a criação de formulários performáticos e flexíveis.
- **Zod**: Para validação de schemas, garantindo a integridade dos dados desde o cliente até o banco de dados.

### **Routing**
- **React Router DOM**: Para a implementação de navegação e rotas na aplicação.

---

## Funcionalidades Principais

- **Formulários Dinâmicos**: Construção de formulários de pesquisa customizáveis.
- **Coleta de Dados Segura**: Validação de dados no cliente e envio seguro para o backend.
- **Interface Responsiva**: Experiência de usuário otimizada para desktops e dispositivos móveis.
- **Componentização Inteligente**: Código organizado em componentes reutilizáveis e de fácil manutenção.
- **Integração com Backend**: Conexão direta com o Supabase para persistência de dados.

---

## Como Executar o Projeto

Para rodar este projeto localmente, siga os passos abaixo.

### **Pré-requisitos**

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Bun](https://bun.sh/) (opcional, como gerenciador de pacotes)
- Um editor de código de sua preferência, como [VS Code](https://code.visualstudio.com/).

### **Instalação**

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    bun install
    ```

3.  **Configure as variáveis de ambiente:**
    - Renomeie o arquivo `.env.example` para `.env.local`.
    - Adicione suas credenciais do Supabase (URL do projeto e `anon key`) no arquivo `.env.local`.

### **Execução**

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    bun dev
    ```

2.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal).

### **Scripts Disponíveis**

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run lint`: Executa o linter (ESLint) para análise de código.
- `npm run preview`: Inicia um servidor local para visualizar a build de produção.

---

## Estrutura do Projeto

O código-fonte está organizado da seguinte forma para facilitar a navegação e manutenção:

```
/src
├── /components       # Componentes React reutilizáveis
│   ├── /ui           # Componentes base da UI (shadcn/ui)
│   └── FormSelector.tsx
├── /hooks            # Hooks customizados
├── /integrations     # Módulos de integração com serviços externos
│   └── /supabase     # Configuração do cliente Supabase
├── /lib              # Funções utilitárias
├── /pages            # Componentes que representam as páginas da aplicação
└── main.tsx          # Ponto de entrada da aplicação
```

---

Este `README.md` foi gerado para refletir a alta qualidade e o profissionalismo aplicados no desenvolvimento deste projeto.