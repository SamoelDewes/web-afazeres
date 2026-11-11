# Instruções de Desenvolvimento: App de Tarefas Domésticas

## 1. Visão Geral do Projeto

Você irá atuar como um desenvolvedor web sênior para criar uma aplicação **Mobile-First** de gerenciamento de tarefas domésticas. O objetivo do app é organizar as tarefas da casa (ex: lavar louça, consertar algo), atribuí-las a pessoas específicas e dividi-las entre "Semana" e "Final de Semana".

## 2. Stack Tecnológico (Otimizado para Vercel)

* **Frontend/Framework:** Next.js (App Router) - *Obrigatório para garantir 100% de compatibilidade e performance no deploy da Vercel.*
* **Estilização:** Tailwind CSS (foco extremo em mobile-first, design limpo e responsivo).
* **Backend/Banco de Dados:** Supabase (PostgreSQL).
* **Autenticação:** Supabase Auth (Email/Senha).
* **Ícones:** Lucide React (ou Radix Icons).
* **Deploy:** Vercel (o projeto deve rodar `npm run build` sem erros para deploy contínuo).

## 3. Requisitos Principais (Core Features)

1. **Sistema de Autenticação:**
   * Tela de Login obrigatória. Ninguém pode visualizar ou editar as tarefas sem estar logado.
   * *Dica para IA:* Utilize o pacote `@supabase/ssr` para gerenciar a sessão de forma segura no Next.js App Router (Server e Client components).

2. **Gestão de Pessoas (Membros da Casa):**
   * Capacidade de adicionar novos membros pelo nome.
   * Capacidade de remover membros.

3. **Gestão de Tarefas:**
   * Criar tarefas (título).
   * Classificar a tarefa por período: "Semana" ou "Final de Semana".
   * Atribuir uma ou mais pessoas cadastradas à tarefa.
   * Marcar tarefas como concluídas.
   * Excluir tarefas.

## 4. Estrutura de Banco de Dados Sugerida (Supabase)

O assistente deve prever a seguinte estrutura relacional:

* **Tabela `profiles` (ou gerenciar via Auth do Supabase):**
  * Para gerenciar o usuário logado (administrador do app).
* **Tabela `members`:**
  * `id` (uuid, PK)
  * `name` (text)
  * `created_at` (timestamp)
* **Tabela `tasks`:**
  * `id` (uuid, PK)
  * `title` (text) - Ex: "Lavar louça"
  * `period` (text) - Enum: 'week' | 'weekend'
  * `is_completed` (boolean) - Default: false
  * `created_at` (timestamp)
* **Tabela `task_assignees` (Relacionamento N:N):**
  * `task_id` (uuid, FK para tasks.id)
  * `member_id` (uuid, FK para members.id)

*(Nota para a IA: O código deve incluir as queries SQL ou as chamadas do cliente Supabase para criar e manipular essas tabelas e políticas de RLS, garantindo que o usuário autenticado tenha acesso).*

## 5. Fluxo de UI/UX (Telas)

Como o app é **Mobile-First**, a interface deve parecer um aplicativo nativo no navegador do celular.

### Tela 1: Login
* Formulário simples centralizado na tela.
* Campos: Email e Senha.
* Botão "Entrar" com estado de loading.

### Tela 2: Dashboard (Lista de Tarefas) - *Página Principal*
* **Header:** Título do app e botão de Logout/Menu.
* **Filtros/Tabs:** Um botão tipo "Toggle" no topo alternando entre "Semana" e "Final de Semana".
* **Lista de Tarefas:** Cards para cada tarefa.
  * O card deve ter um checkbox para concluir a tarefa.
  * Título da tarefa.
  * Avatares pequenos ou nomes das pessoas atribuídas.
* **Botão Flutuante (FAB):** Um ícone grande de "+" no canto inferior direito para adicionar nova tarefa.

### Tela 3: Nova/Editar Tarefa (Pode ser um Modal ou Bottom Sheet)
* Input de texto para o nome da tarefa.
* Toggle/Radio Buttons: "Semana" ou "Final de Semana".
* Seção "Quem vai fazer?": Lista de membros da casa com checkboxes para selecionar.
* Botão "Salvar".

### Tela 4: Gerenciar Pessoas
* Acessível via um ícone de configurações ou menu no Header.
* Input para digitar o nome da pessoa + Botão "Adicionar".
* Lista de pessoas existentes com um botão de exclusão (ícone de lixeira) ao lado de cada uma.

## 6. Instruções de Implementação para a IA

1. Inicialize o projeto Next.js com Tailwind CSS (`npx create-next-app@latest`).
2. Configure variáveis de ambiente prontas para Vercel (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Configure o cliente do Supabase utilizando Server Actions do Next.js para mutações de dados (segurança extra) ou `@supabase/ssr` para requisições em Client/Server components.
4. Crie os componentes base (botões, inputs e modais) usando a estrutura do App Router (`app/`).
5. Implemente as telas na ordem: Login -> Dashboard -> Modal de Tarefa -> Gestão de Pessoas.
6. Garanta feedback visual (Toasts ou alertas) em caso de erro ou sucesso nas operações.

**Fim das Instruções.** Por favor, siga essas diretrizes e inicie a geração do código focando em um deploy limpo na Vercel.