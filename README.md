![imgame-introduçaõ](https://cdn.discordapp.com/attachments/1156087460175040577/1238645527030267944/56_Sem_Titulo_20240510211429.png?ex=66400a0a&is=663eb88a&hm=95b4ace93999735e373e1c8ffca8f84fa64da429cecffbe97816c3977a7e43fe)

---

# Mini sistema bancário - TypeScript

Bem-vindo ao meu projeto de estudos! Este projeto visa implementar a ideia de um sistema bancário simples feito com TypeScript. Nele, crio um sistema simples que simula uma situação em que é delegada a tarefa de criar um sistema bancário para uma empresa iniciante, onde será possível cadastrar um novo usuário, uma nova conta e realizar as operações simples de saque, depósito e visualização do extrato bancário.

**OBJETIVO:** Utilizar os recursos e a tipagem estática forte que a linguagem TypeScript oferece, além do paradigma de orientação a objetos para implementar classes que serão utilizadas na construção do código, além de estudar e praticar essas tecnologias, que são o principal foco.

**OBSERVAÇÃO:** Este é um projeto de estudos, e melhorias serão feitas assim que possível.

**CRÉDITO:** A ideia deste projeto foi desenvolvida no bootcamp de programação backend em Python fornecido pela DIO.me. Link para mais informações: [https://www.dio.me/](https://www.dio.me/)

--- 


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

A Programação Orientada a Objetos (POO) é um paradigma de programação que se baseia no conceito de "objetos", que representam entidades do mundo real com características (atributos) e comportamentos (métodos). A POO enfatiza a organização do código em unidades autônomas e reutilizáveis, facilitando o desenvolvimento, manutenção e compreensão de sistemas complexos.


![diagrama-completo](https://cdn.discordapp.com/attachments/1156087460175040577/1238632413941338254/61_Sem_Titulo_20240510202142.png?ex=663ffdd4&is=663eac54&hm=481840b6a6c34f182021f557b252238781cbcc0691da644d5d0c19cb58a493be&)

### Estruturas de classes: 


![classe-conta](https://cdn.discordapp.com/attachments/1156087460175040577/1238632413198815325/60_Sem_Titulo.png?ex=663ffdd3&is=663eac53&hm=3ff8e6623dabd29e646eef8027dfa0797a9bd54e4ad809ba20bfa1f92d783f38&)


### Classe Conta

A classe `Conta` implementa as funções principais de uma conta bancária. Ela implementa a interface `INTERFACES.conta` e possui os seguintes aspectos:

#### Atributos e Métodos

- `saldo`: O saldo atual da conta.
- `senha`: A senha de acesso à conta.
- `agencia`: A agência da conta (valor fixo).
- `numero`: O número da conta.
- `cliente`: O nome do cliente associado à conta.
- `historico`: O histórico de transações da conta, representado por um objeto da classe `Historico`.
- `constructor(numero: number, cliente: string, senha: string)`: Construtor da classe que recebe o número da conta, o nome do cliente e a senha como parâmetros. Inicializa os atributos da conta e cria um novo histórico.
- Métodos `get` para acesso aos atributos.
- Métodos `depositar(valor: number)` e `sacar(valor: number)`: Responsáveis por adicionar e retirar fundos da conta, respectivamente.

### Classe Conta_corrente

A classe `Conta_corrente` é uma subclasse de `Conta` e adiciona funcionalidades específicas para uma conta corrente. Ela possui os seguintes aspectos:

#### Atributos e Métodos

- `limite_por_saque`: O valor máximo permitido por saque.
- 
- `limite_saques`: O número máximo de saques permitidos por dia.
- 
- `constructor(numero: number, cliente: string, senha: string)`: Construtor da classe que recebe os mesmos parâmetros que o construtor da classe `Conta`, além de inicializar os atributos específicos de uma conta corrente.
- 
- Método `sacar(valor: number)`: Sobrescrito da classe pai para adicionar verificação de limites de saque e número de saques diários.

### Observações

- As classes `Conta` e `Conta_corrente` são exportadas para que possam ser utilizadas em outros arquivos, como `interfaces.ts` e `index.ts`.
- `Conta_corrente` estende `Conta`, aproveitando funcionalidades básicas e adicionando funcionalidades específicas para uma conta corrente, como limites de saque.



![classe-cliente](https://cdn.discordapp.com/attachments/1156087460175040577/1238632414423810129/59_Sem_Titulo.png?ex=663ffdd4&is=663eac54&hm=c2de6be6f06d6be0f9c82e98a88ad4ac82499fc2bf104581b0210e3a72eec45a&)


### Classe Cliente

A classe `Cliente` representa um cliente genérico do sistema bancário. Ela implementa a interface `INTERFACES.cliente` e possui os seguintes atributos e métodos:

#### Atributos
- `endereco`: Uma string que representa o endereço do cliente.
- `contas`: Um array de objetos `Conta_corrente` que armazena as contas associadas ao cliente.

#### Construtor
- `constructor(endereco: string)`: Recebe como parâmetro o endereço do cliente e inicializa o atributo `endereco`. O atributo `contas` é inicializado como um array vazio.

#### Métodos
- `adicionar_conta(conta: Conta_corrente)`: Adiciona uma nova conta à lista de contas do cliente.
- 
- `realizar_transacao(conta: Conta_corrente, transacao: Saque | Deposito)`: Realiza uma transação na conta especificada, chamando o método `Registrar()` da transação.

### Classe Pessoa_fisica

A classe `Pessoa_fisica` é uma subclasse de `Cliente` e representa um cliente pessoa física do sistema bancário. Ela estende a classe `Cliente` e implementa a interface `INTERFACES.pessoa_fisica`. Possui os seguintes atributos:

#### Atributos
- `nome`: Uma string que representa o nome completo do cliente.
- `data_nascimento`: Um objeto `Date` que representa a data de nascimento do cliente.
- `cpf`: Uma string que representa o CPF do cliente.

#### Construtor
- `constructor(endereco: string, nome: string, data_nascimento: Date, cpf: string)`: Recebe como parâmetros o endereço, nome, data de nascimento e CPF do cliente. Chama o construtor da classe pai `Cliente` passando o endereço como parâmetro, e inicializa os atributos `nome`, `data_nascimento` e `cpf`.

### Observações
- A classe `Pessoa_fisica` é exportada para que possa ser utilizada em outros arquivos, como `index.ts`.

Essas classes representam a estrutura básica de clientes do sistema bancário, com a classe `Pessoa_fisica` especializada para clientes pessoa física.

![class-transação](https://cdn.discordapp.com/attachments/1156087460175040577/1238632414893445120/57_Sem_Titulo.png?ex=663ffdd4&is=663eac54&hm=30cb50afd53aa8685e82bbea6e4431ffb194972b0953ee80b445012c620d34c2&)

### Classe Transacao (Transação)

A classe `Transacao` é uma classe abstrata que define uma estrutura genérica para transações bancárias. Ela possui os seguintes aspectos:

#### Atributos e Métodos

- `Valor()`: Método abstrato que deve ser implementado nas subclasses para retornar o valor da transação.
- 
- `Registrar(conta: Conta_corrente)`: Método abstrato que deve ser implementado nas subclasses para registrar a transação em uma conta corrente específica.

### Classe Saque

A classe `Saque` é uma subclasse de `Transacao` e representa uma transação de saque realizada em uma conta corrente. Ela possui os seguintes aspectos:

#### Construtor
- `constructor(v: number)`: Recebe como parâmetro o valor a ser sacado e inicializa o atributo `valor`.

#### Métodos
- `Valor()`: Retorna o valor do saque.
- `Registrar(conta: Conta_corrente)`: Registra o saque na conta corrente especificada, atualizando o histórico de transações.

### Classe Deposito

A classe `Deposito` é uma subclasse de `Transacao` e representa uma transação de depósito realizada em uma conta corrente. Ela possui os seguintes aspectos:

#### Construtor
- `constructor(v: number)`: Recebe como parâmetro o valor a ser depositado e inicializa o atributo `valor`.

#### Métodos
- `Valor()`: Retorna o valor do depósito.
- `Registrar(conta: Conta_corrente)`: Registra o depósito na conta corrente especificada, atualizando o histórico de transações.

### Observações
- Ambas as classes `Saque` e `Deposito` estendem a classe abstrata `Transacao`.
- As subclasses `Saque` e `Deposito` são exportadas para que possam ser utilizadas em outros arquivos, como `index.ts`.

Essas classes fornecem uma estrutura flexível para representar e registrar transações bancárias em uma conta corrente.
   


![classe-historico](https://cdn.discordapp.com/attachments/1156087460175040577/1238632414629073016/58_Sem_Titulo.png?ex=663ffdd4&is=663eac54&hm=c0b25ccddcc986051ccb09c0c13ea021d3d8b14b24c791ead07523d205c960d4&)

Claro, vou descrever a classe `Historico`:

### Classe Historico

A classe `Historico` é responsável por armazenar todas as transferências feitas a partir da classe `Conta_corrente`. Ela implementa a interface `INTERFACES.historico` e possui os seguintes aspectos:

#### Atributos e Métodos

- `transacoes`: Um array de objetos que representam as transações realizadas.
- 
- `constructor()`: Construtor da classe que inicializa o atributo `transacoes` como um array vazio.
- 
- `get Transacoes()`: Método getter que retorna o array de transações.
- 
- `nova_transacao(tipo: string, valor: number, data: string)`: Método responsável por adicionar uma nova transação ao histórico. Recebe como parâmetros o tipo de transação, o valor e a data, e adiciona essas informações ao array `transacoes`.

### Observações

- A classe `Historico` é exportada para que possa ser utilizada em outros arquivos, como `interfaces.ts`.
- Ela serve como um registro das transações realizadas em uma conta corrente, permitindo acesso e consulta ao histórico de transações.

Essa classe é importante para manter um registro completo das atividades realizadas em uma conta corrente, facilitando a auditoria e o acompanhamento das transações pelos usuários do sistema bancário.