# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), Tailwind CSS, Supabase (PostgreSQL + Auth email/senha), Lucide React, deploy na Vercel. Escolha confirmada pelo brief (instrucao.md); não delegada.

## Users

Membros de uma única casa. Um usuário é o administrador do app (gerenciado via Supabase Auth/profiles); os demais membros da casa são cadastrados por nome e compartilham as mesmas tarefas. Inferência do brief: não há multitenancy — uma só casa por instância.

## Product Purpose

Organizar tarefas domésticas (ex: lavar louça, consertar algo), atribuí-las a pessoas específicas da casa e dividi-las entre "Semana" e "Final de Semana", com conclusão e exclusão de tarefas. Sucesso = tarefas visíveis, atribuídas e concluídas por membros autenticados, em app mobile-first.

## Positioning

App doméstico leve, mobile-first, de uma casa única: tarefa + período + responsáveis, sem camadas de projeto ou workspace. Diferencia o brief: divisão semanal vs final de semana e atribuição a membros nomeados, em tela nativa no navegador do celular.

## Operating Context

Navegador do celular (mobile-first), uso doméstico rápido; autenticação obrigatória para ver ou editar tarefas; deploy contínuo na Vercel (`npm run build` sem erros). Banco Supabase com tabelas `members`, `tasks`, `task_assignees` e políticas de RLS.

## Capabilities and Constraints

- Autenticação: login email/senha obrigatório; login direto (sem confirmação de e-mail, confirmado pelo usuário); estado de loading no botão Entrar.
- Membros: adicionar por nome, remover. Acessível via menu/ícone no header.
- Tarefas: criar (título), classificar período (Semana | Final de Semana), atribuir uma ou mais pessoas (checkboxes), marcar concluída (checkbox no card), excluir.
- Dashboard: header com título e logout/menu; toggle Semana/Final de Semana; lista de cards com checkbox, título, avatares/nomes dos atribuídos; FAB "+" para nova tarefa.
- Nova/editar tarefa: modal ou bottom sheet com input, toggle período, seção "Quem vai fazer?" com checkboxes dos membros, botão Salvar.
- Banco: `members(id uuid PK, name text, created_at)`, `tasks(id uuid PK, title text, period text 'week'|'weekend', is_completed boolean default false, created_at)`, `task_assignees(task_id FK tasks, member_id FK members)`. SQL com tabelas e RLS incluído no repositório (confirmado pelo usuário).
- Feedback visual (toasts/alertas) em erro/sucesso nas operações.
- Não há multitenancy, não há confirmação de e-mail, não há edição de perfil do admin além do login (inferências do brief).

## Brand Commitments

Nome do app não definido no brief (inferência: usar um nome genérico de tarefas domésticas, substituível). Sem paleta, tipografia ou identidade vinculantes.

## Evidence on Hand

instrucao.md (brief completo de funcionalidades, stack, telas e banco). Não há imagens, logo, copy final ou assets de marca; não inventar depoimentos, clientes ou métricas.

## Product Principles

1. Autenticação obrigatória: nada é visível sem login.
2. Mobile-first: interface parece app nativo no celular.
3. Uma casa, tarefas compartilhadas: membros e tarefas não são isolados por usuário.
4. Build limpo na Vercel: `npm run build` sem erros.
5. Feedback visual em toda operação de dados.

## Accessibility & Inclusion

Não há requisito específico estabelecido pelo brief. Usar padrões nativos de teclado, foco e labels nos controles.
