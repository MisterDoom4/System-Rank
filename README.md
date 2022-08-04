# System Rank
Este aplicativo é uma REST API com CRUD(Create,Read,Update,Delete), Node.js e utiliza o banco de dados MongoDB. O objetivo dele é gerenciar um sistema de rank 
específico, que foi idealizado por mim. Utilizando uma Front-End para o acesso aos dados, e comandos para a utilização da API.

## O Rank
O rank foi pensado por mim, tendo três divisões nele: 
- a principal, que representa o "prêmio" máximo que a "pessoa" pode conseguir, dividido por gênero feminino 
e masculino;
- a secundária, que seria um "prêmio" menor, também dividido por gênero; 
- a última divisão é a divisão de duplas, que seria uma combinação de duas "pessoas" para disputar o "prêmio" de duplas. 

As três divisões utilizam um sistema de pontos.

O campeão, ou seja, aquele que tem o "prêmio" ❕(esse prêmio pode ser um titulo de UFC por exemplo, mas vou chamar de prêmio para ficar mais fácil)❕ 
não entra no rank em si, ele está acima de todos os outros, ele não ganha pontos e nem perde, se perder para outros, ele perde o posto de campeão.

O sistema de pontos funciona da seguinte forma: aquele que está abaixo do rank, ou seja, tem poucos pontos, se ganhar de alguém que tem mais pontos que ele, 
ele ganha 3 pontos, já o que perdeu, perde só 2. Aquele que perde para o campeão, fica com os pontos zerados.

Abaixo terá as regras de pontos:


Ganhador:

- Evento especial: ❕(uma condição que faz as perdas e ganhos maiores)❕ 4 pontos
- Acima dele: 3 pontos
- Mesma posição dele: 2 pontos
- Abaixo dele: 1 pontos

Perdedor:

- Evento especial: -3 pontos
- Abaixo dele: -2 pontos
- Acima ou na mesma posição dele: -1 pontos

## Funcionamento da API 
A API tem duas tabelas, a de indivíduos e a de dupla. Abaixo tem a estrutura das duas tabelas:

A tabela 'Solo' ou indivíduo
```
name: {
    type: String,
    required: [true, '*Campo obrigatório!']
  },
  genre: {
    type: String,
    required: [true, '*Campo obrigatório!']
  },
  champion: {
    type: Boolean,
    default: false
  },
  main:{
    type: Boolean,
    default: false
  },
  points:{
    type: Number
  }
```
A tabela das Duplas
```
name: {
    type: String,
    required: [true, '*Campo obrigatório!']
  },
  champion: {
    type: Boolean,
    default: false
  },
  points:{
    type: Number
  },
  participant: [{name: {
    type: String,
    required: [true, '*Campo obrigatório!']
  },}],
  ```
Na tabela Dupla, quando é adicionada no banco de dados, ele coloca no campo de "participant" o id do indivíduo além do nome dele.
