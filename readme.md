# Fastify Template

Este é um template para uma API REST, utilizando das tecnoligias descritas abaixo:

[`Fastify`](https://fastify.dev/) -> Framework web Node.js para criação de APIs focado em velocidade e eficiência.

[`Swagger`](https://swagger.io/docs/) -> Ferramenta para design, construção e documentação de APIs RESTful.

[`TypeScript`](https://www.typescriptlang.org/) -> Superset de JavaScript que adiciona tipagem estática opcional.

[`SQLite`](https://www.sqlite.org/index.html) -> Banco de dados relacional leve e embutido.

[`Prisma`](https://www.prisma.io) -> ORM (Object-Relational Mapping) moderno para Node.js e TypeScript.

[`Prettier`](https://prettier.io/) -> Formatador de código que impõe um estilo consistente.

[`ESLint`](https://eslint.org/) -> Ferramenta de linting para identificar e corrigir problemas em código JavaScript/
TypeScript.

[`Lint-Staged`](https://www.npmjs.com/package/lint-staged) -> Executa linters em arquivos que foram "staged" no Git.

[`Git-Commit-Msg-Linter`](https://www.npmjs.com/package/git-commit-msg-linter) -> Ferramenta para garantir que mensagens de commit sigam um padrão específico.

[`Husky`](https://typicode.github.io/husky/) -> Ferramenta para criar hooks de Git, como pré-commit, pós-commit, etc.

[`Zod`](https://zod.dev/) -> Biblioteca de validação de esquemas e tipos em TypeScript.

[`PlopJS`](https://plopjs.com/documentation/) -> Ferramenta para automação de código e geração de arquivos/templates.

...and more.

## Após o Download, veja como iniciar o Projeto

**Se não tiver o _yarn_**

```
npm i -g yarn
```

## Antes de instalar as dependências
Para manter a configuração do husky e configuralo corretamente, após fazer o clone siga os passos abaixo:
1. ```Delete a pasta _/.git/_```
2. ```git init```
3. ```git add .```
3. ```git commit -m "base Code"```

**É importante que exista esse primeiro commit antes de tudo para que o husky funcione corretamente**

Após isso feito siga normalmente


## Instalar as dependêcias.

```
yarn install
```

Ativar o husky

```
yarn run husky
```

Iniciar o servidor

```
yarn run dev
```

## Modelos de Commits

Antes de todo commit ser feito, automaticamente o app ira rodar o `eslint --fix` e o `prettier --write` caso o app seja aprovado, então, haverá uma validação do `git-commit-msg-linter` validando o formato abaixo:

```
<type>[scope opcional]: <subject>
```

**type**: pode ser uma das seguintes opções:

-   `feat`: A new feature.
-   `fix`: A bug fix
-   `docs`: Documentation only changes
-   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi--colons, etc)
-   `refactor`: A code change that neither fixes a bug nor adds a feature
-   `test`: Adding missing tests or correcting existing ones.
-   `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation.
-   `perf`: A code change that improves performance.
-   `build`: Changes thad affect the build system or external dependencies (example: scopes: gulp, broccoli, npm)
-   `ci`: Changes to the CI configuration files and scripts

## Gerando Arquivos com o PLOP

O plop.js foi configurado no seguinte comando

```
yarn run plop
```

Para gerar arquivos com o plop, basta executar o comando acima e seguir as intruções, ele pode gerar um modulo que contem:

-   Repository
-   Model
-   useCases/
-   entities/
-   rotas
-   e os arquivos para o useCase "CREATE"

Ele também pode gerar um "useCase" que não ira conter rotas, nem model

## Swagger

O swagger ja está configurado para a rota `/docs`, podendo ser alterado no arquivo de configuração.

#### Como criar uma nova rota no swagger ?

Basta configurar e utilizar o schema que o fastify disponibiliza em uma rota.
