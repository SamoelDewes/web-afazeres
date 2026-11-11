# Tarefas de Casa

App mobile-first de gerenciamento de tarefas domésticas. Organize tarefas da casa, atribua a membros e divida entre "Semana" e "Final de Semana".

## Stack

- [Next.js](https://nextjs.org/) (App Router) — TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (v4, mobile-first)
- [Supabase](https://supabase.com/) (PostgreSQL + Auth email/senha)
- [Lucide React](https://lucide.dev/) (ícones)
- Deploy: [Vercel](https://vercel.com/)

## Estrutura do repositório

```
site-anotacao-tarefas/
├── PRODUCT.md              # contexto do produto (impeccable)
├── .impeccable/            # artefatos de design (impeccable)
├── instrucao.md            # brief original de desenvolvimento
├── web/                    # aplicação Next.js
│   ├── app/
│   │   ├── login/          # tela de login (obrigatória)
│   │   ├── cadastro/       # tela de cadastro
│   │   └── dashboard/      # lista de tarefas (página principal)
│   ├── components/         # componentes de UI
│   ├── lib/
│   │   ├── actions/        # Server Actions (membros, tarefas, logout)
│   │   ├── supabase/       # clientes Supabase (server/browser)
│   │   ├── schema.sql      # SQL do banco + políticas RLS
│   │   └── types.ts        # tipos TypeScript
│   ├── .env.example        # variáveis de ambiente (copiar para .env)
│   └── next.config.ts
```

## Primeiros passos

### 1. Instalar dependências

```bash
cd web
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com os valores do seu projeto Supabase:

```bash
cp .env.example .env.local
```

Preencha:
- `NEXT_PUBLIC_SUPABASE_URL` — URL do projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — chave anon pública do Supabase

### 3. Criar o banco de dados

No painel do Supabase, vá ao **SQL Editor** e execute o conteúdo de `web/lib/schema.sql`. Isso cria as tabelas `members`, `tasks`, `task_assignees` e as políticas de RLS (usuário autenticado lê e gerencia tudo da casa única).

### 4. Rodar em desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:3000`. Você será redirecionado para `/login`.

### 5. Build para produção

```bash
npm run build
```

O build deve completar sem erros (requisito para deploy contínuo na Vercel).

### 6. Deploy na Vercel

1. Envie o repositório para o GitHub.
2. Importe o projeto na Vercel (framework: Next.js).
3. Adicione as variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` nas configurações do projeto na Vercel.
4. Faça o deploy. A Vercel executará `npm run build` automaticamente.

## Funcionalidades

- **Autenticação obrigatória:** login email/senha para acessar o dashboard (login direto, sem confirmação de e-mail).
- **Membros da casa:** adicionar e remover pessoas (via menu Configurações no header).
- **Tarefas:** criar com título, classificar em "Semana" ou "Final de Semana", atribuir a um ou mais membros, marcar como concluída e excluir.
- **Dashboard:** toggle Semana/Final de Semana, lista de cards com checkbox de conclusão, título e chips dos responsáveis; FAB "+" para nova tarefa.
- **Feedback visual:** mensagens de sucesso/erro nas operações; estado de loading nos botões.

## Decisões de produto (PRODUCT.md)

- Casa única: um administrador + membros compartilham as mesmas tarefas (sem multitenancy).
- Mobile-first: interface com comportamento de app nativo no navegador do celular.
- `npm run build` limpo para deploy contínuo na Vercel.
