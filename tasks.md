# Roadmap de Sprints (7 dias)

## Sprint 1 (Dias 1–7)

1. Nível 1 – Filtro de Turmas por Nível de Inglês  
   • Front-end: adicionar dropdown em Turmas para selecionar “A1, A2…” e filtrar via computed em Vue.  
   • Back-end: estender GET /turmas?nivel={nivel} no controller; repository Prisma com WHERE `nivel = nivel`.

2. Nível 2 – Total de Alunos por Turma  
   • Front-end: no card de turma, exibir `totalAlunos` abaixo da foto.  
   • Back-end: ajustar GET /turmas para incluir `totalAlunos` contando alunos (Prisma count).

3. Nível 3 – Filtro de Alunos por Status  
   • Front-end: criar checkboxes de status [matriculando, ativo, trancado, cancelado, formado] em AlunosList e filtrar lista.  
   • Back-end: suportar GET /alunos?status={status} no controller; repository filtra coluna `status`.

4. Nível 5 – Página de Detalhes de Aluno com Histórico  
   • Front-end: componente StudentDetail carrega via store.readOther(id) e renderiza timeline de turmas e status.  
   • Back-end: novo endpoint GET /alunos/{id}/historico retornando lista de {turma, período, status}.

## Sprint 2 (Dias 8–14)

2. Nível 2 – Filtro de Cronogramas (Schedules)  
   • Front-end: input search em ScheduleList com debounce; chama GET /schedules?search={termo}.  
   • Back-end: implementar query LIKE no repository e controller para filtrar schedules por nome.

3. Nível 3 – Feedback Mensal e Gráfico de Radar  
   • Front-end: usar Chart.js/@vueuse/chart para plotar Radar com eixos [Speaking, Listening, Structure, Vocabulary, Engagement], consumindo GET /feedbacks/{alunoId}.  
   • Back-end: novo modelo Feedback com 5 notas, service que retorna histórico mensal e controller GET /feedbacks/{alunoId}.

4. Nível 5 – Subnível de Aula (ex.: A1.1, A1.2)  
   • Front-end: estender dropdown de “nível” para suportar strings “A1.1”, “A1.2”.  
   • Back-end: migrar coluna `nivel` para string no schema Prisma; validar com Zod aceitância de subníveis.

## Sprint 3 (Dias 15–21)

3. Nível 3 – CRUD de Aulas e Presenças  
   • Front-end: tela de aulas com campos `tipoAula` (normal, reposição), `statusAula` (OK, cancelada, reagendada), e checklist de presença/falta para cada aluno.  
   • Back-end: entidades Aula e Presenca; endpoints POST/PUT/GET /aulas e /aulas/{id}/presencas; relacionar Aula ← Turma, Professor, Alunos.

4. Nível 5 – Professor Substituto e Logs de Troca  
   • Front-end: no form de aula, seletor de substituto e modal para registro de motivo.  
   • Back-end: tabela AulaSubstituicao com {aulaId, profOriginal, profSubstituto, timestamp, motivo}, service e controller para registrar e consultar.

5. Nível 8 – Relatórios de Frequência e Média de Turma  
   • Front-end: dashboard com filtros por data e turma, gráficos de linha e pizza para frequência e média.  
   • Back-end: service que agrega percentual de presença e calculo de média de notas; endpoint GET /relatorios/turma/{id}?de=&ate=.
