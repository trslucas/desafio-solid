<!-- ## Backend

- [] Precisa usar Docker;
- [] Um servidor em Node.js utilizando Typescript;
- [] Prisma ORM (poderia escolher qualquer um);
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;

## Frontend

- [] React ou Next utilizando Typescript;
- [] CSS3 ou uma biblioteca de estilização de sua preferência (estou usando Ant Desing para testar);
- [] Página para realizar o cadastro na NG informando username e password;
- [] Página para realizar o login informando username e password;

### Página principal deve apresentar:

- [] Balance atual do usuário;
- [] Seção voltada à realização de transferências para outros usuários NG a partir do username de quem sofrerá o cash-in;
- [] Tabela com os detalhes de todas as transações que o usuário participou;
- [] Mecanismo para filtrar a tabela por tipo de transação cash-in/cash-out;
- [] Botão para realizar o log-out; -->

## RFs (Requisitos funcionais) Backend

- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade:
  - input 1:
    - Estado (MG, SP, RJ, etc)
  - input 2:
    - Cidade (Rio de Janeiro, São paulo, etc)
- [] Deve ser possível cadastrar um pet:

  - input 1:
    - Nome
  - input 2:
    - Sobre (até 300 caracteres)
  - input 3:
    - Idade:
      - Filhote: 0 a 2 anos
        Cães: Geralmente, a fase de filhote dura até cerca de 1 ano, mas raças menores podem amadurecer mais rapidamente, enquanto raças maiores podem levar mais tempo para atingir a maturidade.
      - Adulto: 2 a 7 anos
        Cães: A fase adulta pode começar por volta de 1 a 2 anos e continuar até 7 ou mais anos, dependendo do porte e da raça. Cães menores geralmente vivem mais tempo do que cães maiores.
      - Idoso (sênior): 7 ou mais anos
        Cães: A transição para a fase idosa pode começar em torno dos 7 anos para cães menores e pode variar para raças maiores. Cães de raças grandes podem ser considerados idosos por volta dos 6 anos ou até antes.
  - input 4:
    - Porte do cachorro:
      - Pequeno Porte:
        Normalmente, cães pequenos pesam até cerca de 5 a 15 kg. Exemplos incluem Chihuahua, Pomerânia, Yorkshire Terrier.
      - Médio Porte:
        Cães de porte médio geralmente pesam entre 15 a 30 kg. Exemplos incluem Beagle, Cocker Spaniel, Bulldog Francês.
      - Grande Porte:
        Cães grandes geralmente pesam entre 30 a 45 kg. Exemplos incluem Labrador Retriever, Golden Retriever, Pastor Alemão.
      - Gigante Porte:
        Cães gigantes têm peso acima de 45 kg. Exemplos incluem São Bernardo, Dogue Alemão, Mastim Inglês.
  - input 5:
    - Níveis de energia:
      - Baixa Energia (1-3):
        Animais que se enquadram nesta categoria tendem a ser mais calmos e relaxados. Eles podem preferir cochilar e têm requisitos de exercício menos intensos.
      - Média Energia (4-7):
        Animais com níveis médios de energia são geralmente equilibrados. Eles gostam de brincar, fazer exercícios moderados e, em seguida, podem relaxar. Esses animais são frequentemente adequados para famílias com diferentes níveis de atividade.
      - Alta Energia (8-10):
        Animais nesta categoria são geralmente muito ativos e precisam de exercícios regulares e estimulação mental. Eles podem ser hiperativos, adorar brincar intensamente e requerem mais atenção para gastar sua energia.
  - input 6:
    - Nivel de independencia:
      - Alto Nível de Independência:
        Animais nesta categoria são geralmente autossuficientes e precisam de menos atenção constante. Eles podem ser mais independentes em termos de cuidados diários e entretenimento. Gatos, por exemplo, são frequentemente considerados animais de estimação independentes.
      - Médio Nível de Independência:
        Animais com um nível médio de independência podem precisar de alguma atenção e interação, mas também conseguem se entreter e lidar bem quando estão sozinhos por períodos moderados. Alguns cães e gatos podem se enquadrar nessa categoria.
      - Baixo Nível de Independência:
        Animais nesta categoria geralmente demandam uma atenção significativa, tanto em termos de cuidados diários quanto de interação social. Isso pode incluir raças de cães que são muito ligadas aos seus donos e que precisam de exercícios regulares, bem como animais que requerem treinamento e estímulo mental constante.
  - input 7:
    - Ambiente
      - Apartamento (ambiente pequeno)
      - Casa (ambiente medio)
      - Precisa de ambiente amplo (ambiente grande)
      - Se adapta a todos os ambientes (Tanto faz)
  - input 8:
    - Fotos do pet

- [] Deve ser possível filtrar pets por suas características;
- [] Deve ser possível visualizar detalhes de um pet para adoção
- [] Deve ser possível se cadastrar como uma ORG
  - input 1:
    - Nome do responsável
  - input 2:
    - Email
  - input 3:
    - CEP
  - input 4:
    - Endereço
  - input 5:
    - Whatsapp
  - input 6:
    - Senha
  - input 7:
    - Confirmação de senha
- [] Deve ser possível realizar login como uma ORG
  - input 1:
    - Email
  - input 2:
    - Senha

<!-- ## RFs (Requisitos funcionais) Frontend

- [] Deve ser possível se cadastrar um User (informe username, password para cadastrar);
- [] (depois cadastro), automaticamente cria 1 account, na tabela account com R$100 de balance;
- [] Deve ser possível logar um User (informe username, password para cadastrar);
- [] (depois de logado) Deve ser possível ver balance do User
- [] (depois de logado) Deve ser possível ver Tabela com os detalhes de todas as transações que o usuário participou
- [] (depois de logado) Deve ser possível transferir para outros usuários NG a partir do username de quem sofrerá o cash-in
- [] (depois de logado) Deve ser possível filtrar a tabela por tipo de transação cash-in/cash-out;
- [] (depois de logado) Deve ser possível realizar logOut -->

## RNs (Regras de negócio) Backend

- [] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [] Um pet deve estar ligado a uma ORG;
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [] Todos os filtros, além da cidade, são opcionais;
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;

<!-- ## RNs (Regras de negócio) Frontend

- [] username tem que ser único;
- [] username composto por, pelo menos, 3 caracteres;
- [] password composta por pelo menos 8 caracteres, um número e uma letra maiúscula;
- [] (depois cadastro), automaticamente cria 1 account, na tabela account com R$100 de balance;
- [] (depois de logado) pode fazer cash-out informando o username do usuário que sofrerá o cash-in;
- [] (depois de logado) deverá ser capaz de visualizar as transações financeiras (cash-out e cash-in) que participou;
- [] Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela;
- [] Todo usuário logado deverá ser capaz de filtrar as transações financeiras que participou por:
  Transações de cash-out;
  Transações de cash-in;
- [] Só pode cash-out se tiver balance suficiente para isso;
- [] Usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo;
- [] Toda nova transação bem-sucedida deverá ser registrada na tabela Transactions;
- [] Em casos de falhas transacionais, a tabela Transactions não deverá ser afetada; -->

<!-- ## RNFs (Requisitos não-funcionais) Backend

- [] A senha do usuário precisa estar criptografada ao armazenar no Banco de Dados;
- [] O usuário deve ser identificado por um JWT depois de se logar (JSON Web Token) (com 24h de validade);

## RNFs (Requisitos não-funcionais) Frontend

- [] A senha do usuário precisa estar criptografada ao armazenar no Banco de Dados;
- [] O usuário deve ser identificado por um JWT depois de se logar (JSON Web Token) (com 24h de validade); -->
