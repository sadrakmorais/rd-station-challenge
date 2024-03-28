![Static Badge](https://img.shields.io/badge/node-v20.0.0-green)

![Static Badge](https://img.shields.io/badge/jest-v26.3.3-blue)

# Challeng RD STATION

Desafio proposto como parte do processo seletivo para vaga de desenvolvedor front end Pleno

## O Desafio

Este desafio consiste em um sistema de balanceamento entre clientes e Customer Success (CSs). Os CSs são os Gerentes de Sucesso, são responsáveis pelo acompanhamento estratégico dos clientes.

Dependendo do tamanho do cliente - aqui nos referimos ao tamanho da empresa - nós temos que colocar CSs mais experientes para atendê-los.

Um CS pode atender mais de um cliente, além disso os CSs também podem sair de férias, tirar folga, ou mesmo ficarem doentes, então é preciso levar esses critérios em conta na hora de rodar a distribuição.

Dado este cenário, o sistema distribui os clientes com os CSs de capacidade de atendimento mais próxima (maior) ao tamanho do cliente.

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/sadrakmorais/rd-station-challenge.git
```

Instale as dependências

```bash
  yarn install
```

Inicie os testes

```bash
  yarn test
```

Ou usando o NPM:

```bash

npm install
npm test
```

## Melhorias

Adicionado testes extra que verificam se todas as regras estão sendo seguidas, como número máximo de CSs ou nível máximo de clientes

## Stack utilizada

**Front-end:** JavaScript,Jest

## Autor

- [@sadrakmorais](https://github.com/sadrakmorais)
