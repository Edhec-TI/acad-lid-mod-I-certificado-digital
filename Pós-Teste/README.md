# Academia de Líderes - Módulo I: Pós Teste

## Visão Geral do Projeto

Este projeto consiste em uma aplicação web desenvolvida para o Pós Teste do Módulo I da Academia de Líderes. A aplicação apresenta um formulário interativo onde os participantes podem inserir seus dados e responder a uma série de perguntas de múltipla escolha. As respostas são então persistidas em um banco de dados utilizando Supabase.

## Autor

*   **Fabio Costa**

## Tecnologias Utilizadas

A aplicação foi construída com as seguintes tecnologias:

*   **React:** Biblioteca para construção da interface de usuário.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
*   **Vite:** Ferramenta de build e desenvolvimento front-end de alta performance.
*   **Tailwind CSS:** Framework de estilização CSS "utility-first".
*   **shadcn/ui:** Biblioteca de componentes de UI.
*   **Supabase:** Plataforma open-source para backend, utilizada para o banco de dados.
*   **React Hook Form:** Biblioteca para gerenciamento de formulários.
*   **React Router DOM:** Biblioteca para o gerenciamento de rotas.

## Como Executar o Projeto Localmente

Para rodar este projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos:

*   Node.js (versão 18 ou superior)
*   npm ou Yarn

### Passos:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd <NOME_DO_PROJETO>
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Configuração do Supabase (Variáveis de Ambiente):**
    Este projeto utiliza variáveis de ambiente para se conectar ao Supabase. Crie um arquivo `.env` na raiz do projeto e insira suas credenciais do Supabase:
    ```
    VITE_SUPABASE_URL=SUA_URL_DO_SUPABASE
    VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_DO_SUPABASE
    ```
5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Após executar esses comandos, a aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
/
├── public/                # Arquivos públicos
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── ui/            # Componentes da biblioteca shadcn/ui
│   │   ├── PreTestForm.tsx  # Componente principal do formulário
│   │   └── SuccessPopup.tsx # Componente do popup de sucesso
│   ├── hooks/             # Hooks customizados
│   ├── integrations/      # Integrações com serviços externos
│   │   └── supabase/      # Configuração do cliente e tipos do Supabase
│   ├── lib/               # Funções utilitárias
│   ├── pages/             # Páginas da aplicação
│   ├── App.tsx            # Componente raiz com as rotas
│   └── main.tsx           # Ponto de entrada da aplicação
├── package.json
└── vite.config.ts
```

## Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais informações.
