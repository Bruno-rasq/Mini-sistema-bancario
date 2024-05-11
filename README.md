![imgame-introduçaõ](https://cdn.discordapp.com/attachments/1156087460175040577/1238645527030267944/56_Sem_Titulo_20240510211429.png?ex=66400a0a&is=663eb88a&hm=95b4ace93999735e373e1c8ffca8f84fa64da429cecffbe97816c3977a7e43fe)

# Mini sistema bancário - ts

Bem-vindo! ao meu projeto de estudos, este projeto visa implementar a ideia de um sistema bancário simples
feito com typescript. nele eu crio um sistema simples que simula uma situação em que é delegado a tarefa de 
criar um sistema bancario para uma empresa iniciante onde nele será possivel cadastrar um novo usuário, uma nova conta e fazer as operações simples de Saque, Deposito e visualização do extrato bancário.

OBJETIVO: Utilizar dos recusos e tipagem estática forte que a linguagem typescript fornece e paradigma de orientação a objetos para implementando classes que serão utilizadas na construção do código, aém claro de estudar e praticar essas tecnologias que é o principal.

OBSERVAÇÃO: Este é um projeto de estudos, melhorias serão feitas assim que possivel.

CRÉTIDO: A ideia deste projeto foi desenvolvida no bootcamp de programação backend em python fornecido pela DIO.me
link para mais informações: https://www.dio.me/

## Indices

- [Introdução](#Introdução)
- [Utilização](#Utilização)
- [POO](#POO)
- [Tecnologias](#Tecnologias-e-dependecias)
- [Instalação](#Instalação)



## Introdução 

![diagrama-fluxo-principal](https://cdn.discordapp.com/attachments/1156087460175040577/1238632412817391738/1715383181512.png?ex=663ffdd3&is=663eac53&hm=b60fbf75d68e6365f45ecf59174e554b0ba8f1186c2a09c7ec15a77dfcc69ac8&)

A ideia da aplicação é que após iniciada seja apresentada ao usuário uma tela principal com três opções
de operações, na primeira opção o usuario poderá se logar no sistema, operação no qual leva o usuario para uma 
tela de controle com algumas operações, como deposito, saque e visualização de extrato.

Nas segunda opção da tela inicial o usuário é levado para uma tela de cadastro onde é possivel cadastrar um novo
usuário no sistema e criar uma nova conta corrente, cada usuario deve possuir um cpf unico por tanto não é possivel
cadastrar dois usuarios ou mais com o mesmo cpf. cada usuário pode ter uma ou muitas contas registradas.

Já na terceira opção da tela inicial é simplesmente uma função "Sair" que dá como encerrado o programa. Todas as outras telas tambem possuem a opção de sair porem todas voltam para o menu principal.



## Utilização

Assim que iniciado o script, o usuário deverá cadastrar uma conta como cliente, o Funcionamento é bem simples:

será requisitado o nome, endereço, data de nascimento e um cpf do usuario, assim que inserido esses dados o script se encarregará de criar um novo Cliente(@classe - Cliente), caso não haja nenhum outro cliente cadastrado com o mesmo CPF, se houver é retornado uma mensagem de erro indicando que não foi possivel cadastrar o novo usuario e redicionará o app para a tela de cadastro novamente.

caso o cadastro de usuario for um sucesso ai então será possivel criar uma nova conta que será vinculada ao cliente cadastrado, para criar a conta é necessário, inserir o nome de usuario, o cpf que foi cadastrado e uma senha para validar as transações posteriores. com a conta criada é exibida uma mensagem em tea de confirmação, é importante se atentar ao numero da conta que for passado na mensagem pois ele será necessário para realizar as transações.

Terminado o cadastro de cliente e conta, então o usuario pode sair da tela de cadastro voltando a tela principal
para poder entrar na tela de operações, lá terá três opções além de voltar ao menu principal, são elas:

\[Deposito\] - Função pedirá o valor que deseja depositar, este valor só tem restrinção não poder ser negativo ou 0
depois, de inserido o valor é necessário confirmar a senha, CPF e numero da conta para que ´so ai a                  transação seja realizada.

\[Saque\] - Função de saque segue o mesmo processo que a função de deposito com o diferencial de que só é possivel 
fazer saques com valores abaixo de R$ 500,00 e (igual ou abaixa do saldo disponivel), a cima deste valor a transação não funcionará, também só é permitido efetuar 3 saques por dia.

\[ver-extrato\] - Função de extrato exibe um historico com todas as transações feitas na conta ou se não houveram transações, alem de mostrar o saldo atual. é necessario informar o numero da conta e o CPF

          

## POO

### Estruturas de classes: 

desenvolvend...

![diagrama-completo](https://cdn.discordapp.com/attachments/1156087460175040577/1238632413941338254/61_Sem_Titulo_20240510202142.png?ex=663ffdd4&is=663eac54&hm=481840b6a6c34f182021f557b252238781cbcc0691da644d5d0c19cb58a493be&)

desenvolvend...

![classe-conta](https://cdn.discordapp.com/attachments/1156087460175040577/1238632413198815325/60_Sem_Titulo.png?ex=663ffdd3&is=663eac53&hm=3ff8e6623dabd29e646eef8027dfa0797a9bd54e4ad809ba20bfa1f92d783f38&)

### Conta

desenvolvend...


![classe-cliente](https://cdn.discordapp.com/attachments/1156087460175040577/1238632414423810129/59_Sem_Titulo.png?ex=663ffdd4&is=663eac54&hm=c2de6be6f06d6be0f9c82e98a88ad4ac82499fc2bf104581b0210e3a72eec45a&)

### Classe Cliente

desenvolvend...


![class-transação](https://cdn.discordapp.com/attachments/1156087460175040577/1238632414893445120/57_Sem_Titulo.png?ex=663ffdd4&is=663eac54&hm=30cb50afd53aa8685e82bbea6e4431ffb194972b0953ee80b445012c620d34c2&)

### Transação

A classe Transação é uma classe abstrata (não pode ser instanciada), ela é responsavel por servir como uma estrutura base para as classes de Deposito e Saque, implementa

   #### Atributo:
   - valor {number} = valor da transação

   #### Método:
   -realizar_transacao(): 
   

desenvolvend...

![classe-historico](https://cdn.discordapp.com/attachments/1156087460175040577/1238632414629073016/58_Sem_Titulo.png?ex=663ffdd4&is=663eac54&hm=c0b25ccddcc986051ccb09c0c13ea021d3d8b14b24c791ead07523d205c960d4&)

### Histórico

A classe Historico é responsável por instanciar para cada usuário um Array de objetos do Tipo Transação que servirá
como um registro de cada transações de deposito ou saque feito na conta além de servir para recuperar o extrato bancario do usuario. Implementa:

  #### Atributos:
    - transacoes {Array<Transações>}: armazena registros de transações

  #### Métodos:
    - adicionar_transacao(valor, tipo, data): adiciona uma nova transação aos registros.
    - GET Transacoes(): método que retornaa lista de transações

## Tecnologias e dependecias

desenvolvendo...

## Instalação

desenvolvendo...