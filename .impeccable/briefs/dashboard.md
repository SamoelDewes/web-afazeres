# Surface brief — Dashboard (lista de tarefas)

Escopo: rota principal do app após login. Mobile-first.
Modo do visitante: Operate (completar uma tarefa — ver, atribuir, concluir, adicionar tarefas domésticas).
Público, job, ação: membro da casa quer saber o que fazer esta semana/fim de semana, quem é responsável por cada tarefa e concluir ou adicionar tarefas em poucos toques.
Prova/conteúdo: cards de tarefa com checkbox, título, chips dos responsáveis; toggle Semana/Final de Semana; lista esvaziada quando não há tarefas no período.
Restrições: autenticação obrigatória; uma casa só (sem multitenancy); build Next.js no App Router; deploy na Vercel (`npm run build` limpo); componentes web padrão (não traje de ferramenta).

## Direction contract

THESIS: uma única tela de trabalho — a lista de tarefas da casa — onde o visitante entra, escolhe o período (Semana ou Final de Semana), vê tarefas com responsáveis e conclui ou adiciona em poucos toques. Recusa landing page, cadastro de várias etapas e qualquer navegação que não seja a lista e o menu de membros.

OWN-WORLD: concha (header + FAB) em índigo comprometido sobre fundo levemente avivaado; tipografia sistema (stack sem serifa) para leitura rápida; densidade confortável (alvos de toque ≥44px); assinatura = toggle Semana/Final de Semana como divisor físico que retinge o detalhe da concha e reordena/filtra a lista com crossfade suave.

STORY: o visitante entende que está na lista de tarefas da casa, escolhe o período, vê quem é responsável por cada tarefa e conclui ou adiciona tarefas em poucos toques, com feedback visual em cada ação.

FIRST VIEWPORT: header com título do app e botão sair/menu à direita; abaixo, toggle Semana | Final de Semana; lista de cards (checkbox, título, chips dos responsáveis); FAB "+" fixo no canto inferior direito. Nada acima da lista além do header e do toggle.

FORM: code-led (superfície Operate — não há rodada de comp; a ambição vive no contrato e no signature interaction). Seed: modo operate.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorável

O toggle Semana/Final de Semana como o gesto físico da casa (como alternar um quadro de avisos) — o visitante sente que trocou de quadro, não apenas filtraram uma lista.

## Decisões em aberto

Nome do app (inferência: "Tarefas de Casa", substituível).
