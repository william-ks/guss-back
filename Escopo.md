# ✅ Escopo Revisado do Sistema Educacional

## 🔹 MVP Essencial (Enxuto e Operacional)

> Este MVP entrega a operação mínima: cadastro, login, gestão de turmas com cronogramas e aulas, e controle de presença. Evita features cosméticas e mantém foco na jornada do aluno e operação pedagógica.

### Autenticação e Controle de Acesso

- [x] Página de login (aluno e gestor)
- [x] Cadastro de gestor master (dev)
- [x] Segurança por permissões (RBAC)
- [x] Geração automática de permissões por rota
- [ ] Toda permissão nova atribuída automaticamente ao "dev master"
- [ ] Logs de alterações de permissões

### Gerenciamento de Alunos

- [x] Cadastrar aluno
- [x] Listar alunos
- [x] Desativar aluno (sem deletar)
- [x] Corrigir bug: data de nascimento no calendário
- [x] Visualizar aluno (página de detalhes básica)
- [ ] Painel de gestão do aluno (com informações básicas)
- [ ] Mudar status do aluno
- [ ] Relacionar aluno à Aula (presença)

### Gerenciamento de Turmas

- [x] Criar turma
- [x] Listar turmas
- [x] Adicionar e remover alunos da turma
- [ ] Editar turma
- [ ] Definir nível e status da turma (`em formação`, `em andamento`, `trancado`, `finalizado` etc.)
- [x] Relacionar turma a cronograma
- [x] Exibir quantidade de alunos
- [x] Corrigir: integração com cronograma ao criar turma

### Gerenciamento de Cronogramas e Aulas

- [x] Criar cronograma
- [x] Adicionar aulas ao cronograma
- [x] Listar cronogramas
- [ ] Editar cronograma
- [ ] Importar aulas de outro cronograma

### Aulas

- [x] Criar aula (vinculada ao cronograma)
- [ ] Editar aula
- [ ] Adicionar subnível (Beginner, Intermediary, Advanced)
- [ ] Marcar presença/falta por aluno em uma aula
- [ ] Finalizar aula (com regras mínimas)

---

## 🔹 Pós-MVP (Funcionalidades Avançadas)

Essas funcionalidades aumentam a eficiência, experiência do usuário e escalabilidade, mas não são necessárias para o funcionamento inicial.

### Alunos

- [ ] Histórico de turmas pelas quais o aluno passou
- [ ] Emotes como foto de perfil
- [ ] Adicionar Link para contrato
- [ ] Trancar/arquivar/deletar aluno
- [ ] Aluno editar seus próprios dados
- [ ] Filtros por status, nome, turma, status, etc.
- [ ] Adicionar status ao aluno: `matriculando`, `aguardando turma`, `ativo`, `cancelado`, `formado`

### UX do Aluno

- [ ] Página Home (dashboard com cronograma e aulas futuras)
- [ ] Visualizar feedbacks (caso já existam)
- [ ] Editar dados pessoais
- [ ] Ver presença (histórico simples)
- [ ] Mudar side bar para position fixed para sobrepor a tela

### Gestores

- [ ] Filtros e busca
- [ ] Melhor UX de permissões
- [ ] Remoção de gestores
- [ ] Logs de ações administrativas

### Cronogramas

- [ ] Interface tabular com filtros
- [ ] Drag & drop para ordenar aulas
- [ ] Página de edição completa no frontend

### Feedbacks

- [ ] Registrar, editar e deletar feedbacks
- [ ] Exibir gráfico por aluno
- [ ] Modal de feedbacks
- [ ] Enviar feedback por e-mail

### Aulas e Presenças

- [ ] Visualização de frequência por aluno
- [ ] Vincular tarefas/homeworks

---

## 🔹 Fora de Escopo

- Integrações Google (Calendar, Drive, Meet)
- Aplicativo Mobile
- Relatórios avançados
- Controle de horas dos professores
- [ ] Criação de aulas avulsas/livres (sem cronograma)

---

## 🔗 Modelo Conceitual de Relacionamentos (Base de Dados)

```plaintext
Aluno
 └─ pertence a → Turma
      └─ tem um → Cronograma
            └─ possui várias → Aulas
                  └─ registra → Presença (por aluno)
                        └─ relacionada a → Homework/Feedback (opcional)
```
