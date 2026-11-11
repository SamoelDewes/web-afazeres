# Design — Tarefas de Casa

Mundo visual da superfície Operate (dashboard de tarefas domésticas). Registrado no finish da build.

## Modo

Operate: o visitante veio fazer o trabalho. A página é primeiro um produto funcional da categoria; o mundo empresta apenas tipo, paleta, densidade e uma assinatura. Nunca fornece layout, modelo de navegação ou controles — esses são padrões da web (botões, inputs, toggles, cards).

## Paleta (committed)

O índigo carregado é a cor da concha (header + FAB), usada em campos que integram regiões, não como acento disperso sobre fundo cinza.

- `--indigo-dark` #3730a3 — concha (header, FAB, toggle ativo, botões de ação primária)
- `--indigo-base` #4f46e5 — hover da concha, anéis de foco
- `--indigo-light` #eef2ff — fundo do ícone da marca, fundo do chip "Fim de Semana", fundo do toggle inativo
- `--background` #f8fafc — ground da tela (levemente avivado, não cinza puro)
- `--surface` #ffffff — superfície dos cards e do modal
- `--border` #e2e8f0 — bordas de cards, inputs, toggle
- `--foreground` #0f172a — texto principal dos cards/títulos
- `--muted` #64748b — texto secundário, labels, chips de membros
- `--muted-bg` #f1f5f9 — fundo dos chips de membros
- `--success` #16a34a — conclusão de tarefa (check do checkbox), toast de sucesso
- `--success-bg` #ecfdf5 — fundo do toast de sucesso
- `--danger` #dc2626 — exclusão, toast de erro
- `--danger-bg` #fef2f2 — fundo do toast de erro

Modo escuro: fundo #0b0f19, superfície #111827, borda #1e293b, índigo-light #1e1b4b. Texto secundário tintado do índigo/foreground, nunca cinza neutro.

## Tipografia

- Fonte: `Inter` (stack sem serifa, self-hosted via `next/font/google`), variável `--font-sans`.
- Leitura rápida em tamanhos pequenos (text-sm para corpo dos cards), display em text-lg/text-2xl no header.
- Sem gradient text. Ênfase por peso ou tamanho.
- Mais espaço acima de um heading do que abaixo.

## Densidade e componentes

- Alvos de toque ≥44px (botões de ação do card, FAB 56px, inputs com altura confortável).
- Cards: `border border-border bg-surface shadow-sm rounded-2xl p-3.5`, hover aumenta a sombra. Não há cards aninhados.
- Checkbox de conclusão: círculo 24px, traço 3px, preenchido em sucesso quando concluído.
- Chips de membros: arredondados completos, texto 11px, borda sutil.
- Toggle Semana/Final de Semana: pílula dividida, lado ativo em índigo-dark sobre branco, lado inativo transparente sobre superfície; assinatura da superfície.
- FAB: 56px, fixo inferior direito, sombra elevada, ícone "+".
- Header: concha índigo-dark, texto branco, sombra suave (offset + blur).
- Modal de tarefa: fundo de superfície, desfocado atrás (backdrop-blur), animação de entrada da parte de baixo.

## Estados

- hover, disabled, loading, error, empty.
- Tarefa concluída: título riscado, texto secundário, checkbox preenchido em verde.
- Empty state: ícone centralizado, texto "Nenhuma tarefa neste período", botão de criação.
- Toast de sucesso/erro na parte superior do dashboard.

## Assinatura (signature move)

O toggle Semana/Final de Semana funciona como um divisor físico que retinge o detalhe da concha (ativa o lado correspondente em índigo-dark) e reordena/filtra a lista com crossfade suave. O visitante sente que trocou de quadro de avisos, não apenas filtraram uma lista.

## Responsividade

Mobile-first: o layout é pensado para o celular (coluna única, FAB inferior direito, cards largura total). Em desktop (1280–1600), o primeiro viewport continua visível; não há grade fixa de px que quebre abaixo do ponto de ruptura.

## Acessibilidade

- Labels em todos os inputs; controles nomeiam sua ação.
- Foco visível (anel índigo-base).
- Botões de ação do card com `aria-label`.
- Navegação por teclado preservada (componentes web nativos).

## Proveniência

Tokens definidos em `web/app/globals.css` (`:root` e `@theme inline`). Cores usadas via classes Tailwind arbitrárias (`bg-indigo-dark`, `text-indigo-dark`, etc.) e variáveis CSS. Nenhuma fonte hospedada externamente (Inter via `next/font`).
