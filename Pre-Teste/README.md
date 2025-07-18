# Academia de Líderes - Módulo I (Pré-Teste)

![Logo da Academia de Líderes](public/lovable-uploads/20ad0516-4432-4522-bcb2-b243b13efc0c.png)

## 📖 Visão Geral

Este projeto é uma aplicação web desenvolvida para a **Academia de Líderes**, servindo como a plataforma para o **Pré-Teste do Módulo I**. A aplicação permite que os alunos cadastrados respondam a um questionário de múltipla escolha e indiquem seu nível de convicção em cada resposta.

O sistema foi desenhado para ser intuitivo, apresentando uma pergunta por vez para focar a atenção do usuário e garantir que todas as respostas sejam salvas de forma segura e eficiente no banco de dados.

## ✨ Funcionalidades Principais

* **Formulário Dinâmico:** Apresenta um questionário de 10 perguntas, uma de cada vez, para uma experiência de usuário mais fluida e focada.
* **Identificação do Aluno:** Coleta o nome completo e o CPF do participante no início do teste.
* **Validação de CPF:** Antes de submeter as respostas, o sistema verifica se o CPF informado pertence a um aluno previamente cadastrado no sistema, garantindo que apenas usuários autorizados participem.
* **Nível de Convicção:** Para cada pergunta, o aluno utiliza um controle deslizante (`Slider`) para indicar seu grau de certeza sobre a resposta, variando de 0 a 100%.
* **Persistência de Dados:** As respostas do formulário, incluindo as seleções e os níveis de convicção, são enviadas e armazenadas de forma segura em um banco de dados **Supabase**.
* **Feedback de Sucesso:** Após o envio bem-sucedido do formulário, um pop-up de confirmação é exibido para o usuário.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com um conjunto de tecnologias modernas para garantir performance, escalabilidade e uma ótima experiência de desenvolvimento:

* **Build Tool:** [**Vite**](https://vitejs.dev/)
* **Framework Front-end:** [**React**](https://react.dev/) 18 com [**TypeScript**](https://www.typescriptlang.org/)
* **Backend e Banco de Dados:** [**Supabase**](https://supabase.com/) (PostgreSQL)
* **Estilização:** [**Tailwind CSS**](https://tailwindcss.com/) para estilização utilitária.
* **Componentes de UI:** [**shadcn/ui**](https://ui.shadcn.com/), utilizando componentes base do [**Radix UI**](https://www.radix-ui.com/) para acessibilidade e design.
* **Gerenciamento de Formulário:** [**React Hook Form**](https://react-hook-form.com/) para um gerenciamento de estado de formulários eficiente e performático.
* **Validação de Schema:** [**Zod**](https://zod.dev/) para validação de dados do formulário.
* **Roteamento:** [**React Router DOM**](https://reactrouter.com/) para navegação entre páginas.

## 🛠️ Configuração e Execução Local

Para executar este projeto em seu ambiente de desenvolvimento, siga os passos abaixo.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) (gerenciador de pacotes)

### Passos para Instalação

1.  **Clone o repositório:**
    ```sh
    git clone <URL_DO_SEU_REPOSITORIO>
    cd Pre-Teste
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    ```

3.  **Configuração do Supabase:**
    Certifique-se de que as credenciais do Supabase no arquivo `src/integrations/supabase/client.ts` estão corretas para o seu ambiente.

4.  **Execute o servidor de desenvolvimento:**
    ```sh
    npm run dev
    ```

Após executar o último comando, a aplicação estará disponível em `http://localhost:8080` (ou outra porta, se a 8080 estiver em uso).

## 🗂️ Estrutura do Projeto

A estrutura de pastas do projeto está organizada da seguinte forma para facilitar a manutenção e escalabilidade:

/
├── public/                # Arquivos estáticos e imagens
├── src/
│   ├── components/
│   │   ├── ui/            # Componentes reutilizáveis do shadcn/ui
│   │   ├── PreTestForm.tsx  # Componente principal do formulário
│   │   └── SuccessDialog.tsx# Componente de diálogo de sucesso
│   ├── hooks/             # Hooks customizados (ex: use-toast)
│   ├── integrations/
│   │   └── supabase/      # Configuração do cliente e tipos do Supabase
│   ├── lib/               # Funções utilitárias (ex: cn para classes)
│   ├── pages/             # Componentes de página (rotas)
│   ├── App.tsx            # Componente raiz da aplicação com as rotas
│   └── main.tsx           # Ponto de entrada da aplicação
├── supabase/
│   └── migrations/        # Migrations do banco de dados SQL
├── package.json           # Dependências e scripts do projeto
├── tailwind.config.ts     # Configuração do Tailwind CSS
└── vite.config.ts         # Configuração do Vite


## ✒️ Autor

<p align="center">
  Feito com ❤️ por <strong>Fabio Costa</strong>
</p>
