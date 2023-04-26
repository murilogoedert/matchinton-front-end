# matchinton-front-end

Projeto para o trabalho de Gerenciamento de Projetos II

Uma aplicação para o controle e agendamento de partidas de Badminton



## Configuração do Projeto



### Instalar todas as dependências
```sh
npm install
```

### Desenvolvimento / Hot reload

```sh
npm run dev
```

### Checagem de tipos, build e minificação

```sh
npm run build
```

### Rodar os testes unitários com o [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Rodar os testes End-to-End com o [Playwright](https://playwright.dev)

```sh
# Instalar os browsers da primeira vez
npx playwright install

# Quando testado em integração continua, precisa buildar primeiro
npm run build

# Roda os testes end-to-end
npm run test:e2e

# Roda os testes apenas no Chromium
npm run test:e2e -- --project=chromium
# Roda os testes em um arquivo especifico
npm run test:e2e -- tests/example.spec.ts
# Roda os testes em modo Debug
npm run test:e2e -- --debug
```

### Fazer o linting com o [ESLint](https://eslint.org/)

```sh
npm run lint
```


### IDE

Recomenda-se utilizar o VSCode com as extensões:

* ms-playwright.playwright
* Vue.volar
* Vue.vscode-typescript-vue-plugin"
