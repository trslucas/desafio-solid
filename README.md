## Desafio FindAFrend API 

- Desafio consiste em criar uma API utilizando conceitos inversão de dependências, testes unitários e testes E2E para um sistema de adoção de pets 



### Regras da aplicação

- Deve ser possível cadastrar um pet
- Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- Deve ser possível filtrar pets por suas características
- Deve ser possível visualizar detalhes de um pet para adoção
- Deve ser possível se cadastrar como uma ORG
- Deve ser possível realizar login como uma ORG

### Regras de negócio

- Para listar os pets, obrigatoriamente precisamos informar a cidade
- Uma ORG precisa ter um endereço e um número de WhatsApp
- Um pet deve estar ligado a uma ORG
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- Todos os filtros, além da cidade, são opcionais
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada



### Aprendizado 

- Aqui tive oportunidade de melhorar minha construção de um backend dividindo ele por camadas (use-cases, controllers e repository);
- Reforcei conhecimentos em um framework que pouco é falado, mas que é bem tranquilo de usar que é o Fastify;
- Ter a possibilidade criar um backend com a estratégia de inverter as dependências deixou claro qual o intuito em desacoplar a camada de repository da camada de use-case. Pois à partir do momento que fazemos isso, isolamos completamente as regras de negócio da comunicação com o banco de dados, deixando o código muito mais manutenível;
- Para isso utilizei a estratégia de repository pattern, a partir de uma interface que implementa os métodos nos repositorys de testes e para quando o controller chama o use-case;
- Poder escrever testes me fez entender todo o fluxo dos testes unitários para testar os use-cases e dos testes E2E para testar as requisições, os dados e os retornos;
- Nesse projeto também utilizei o sistema de ramificação de branchs, onde toda branch para uma atividade era criada a partir da develop e da develop fazia-se um PR para a main como se fosse o fluxo de um dia-a-dia de trabalho;
- Também tive a oportunidade de colocar o banco de dados no ar desde o início para testar o deploy cada vez que eu fazia um PR da develop para a main;
- Oportunidade de criar uma conteinarização do meu banco de dados, utilizando o docker-composer;
- Nesse caso utilizei o Render para subir o banco de dados da aplicação;


## Tecnologias utilizadas 

- Node
- Typescript
- Fastify (Framework)
- Prisma ORM
- Postgres
- Zod para validações
- Eslint
- Bcrypt
- JWT (Fastify)
- Cookies (Fastify)
- Docker (Docker-composer)
- Vitest (testes unitários)
- Supertest (testes E2E)


## Execução do projeto 
- git clone
- npm install
- Na pasta do projeto -> docker-compose up -d (Para subir o docker) 
- npm run dev 
