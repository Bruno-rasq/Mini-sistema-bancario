import { criar_cliente }                from './operacoes_bancarias/cadastrar_usuario'
import { nova_conta as Nova_conta }     from './operacoes_bancarias/nova_conta'
import { rl }                           from './contrib/readline';
import { TELAS }                        from './contrib/screens';
import { UTILS }                        from './contrib/utils';
import { Pessoa_fisica }                from './oop/clientes';
import { Error }                        from './oop/error';
import { depositar as deposito }        from './operacoes_bancarias/depositar'
import { filtrar_cliente }              from './operacoes_bancarias/filtrar_usuarios'
import { sacar as saque }               from './operacoes_bancarias/sacar'
import { ver_extrato as extrato_conta } from './operacoes_bancarias/extrato'
import { getInput }                     from './contrib/getInput'


type opcao          = 'a' | 'b' | 'c' | 'x';
type opcao_app      = Extract<opcao, 'a' | 'b' | 'x'> | string;
type opcao_cadastro = Extract<opcao, 'a' | 'b' | 'x'> | string;
type opcao_menu     = Extract<opcao, 'a' | 'b' | 'c' | 'x'> | string;



/**
 * @description Função responsável por cadastrar um novo usuário no sistema
 */
async function novo_user(): Promise<void> {

  const nome       = String(await getInput('digite seu nome aqui: '))
  const endereco   = String(await getInput('digite seu endereco: '))
  const nascimento = String(await getInput('digite sua data de nascimento XX/XX/XXXX: '))
  const cpf        = String(await getInput('digite seu CPF: '))

  console.clear()
  criar_cliente(endereco, nome, UTILS.nascimento(nascimento), cpf)
  cadastrar()
}


/**
 * @description Função responsável por criar uma nova conta corrente e anexa-lá a
 * conta de um usuário já cadastrado no sistema
 */
async function nova_conta(): Promise<void> {

  const nome  = String(await getInput('digite seu nome aqui: '))
  const cpf   = String(await getInput('digite seu CPF: '))
  const senha = String(await getInput('digite uma senha para sua conta: '))
  
  console.clear()
  
  Nova_conta(cpf, nome, senha)
  cadastrar()
}


/**
 * @description Função responsável por efetuar a transação de deposito 
 */
async function depositar(): Promise<void> {

  const cpf   = String(await getInput('digite seu cpf: '))
  const conta = Number(await getInput('digite seu numero_da_conta: '))
  const valor = Number(await getInput('digite o valor que deseja depositar: '))
  const senha = String(await getInput('digite seu senha: '))

  console.clear()
  let cliente = filtrar_cliente(cpf)

  if (cliente != false){
    realizar_deposito(valor, conta, senha, cliente)
    return 
  }

  Error.clienteNaoEncontrado()
  menu_conta()
}

function realizar_deposito(valor: number, numero_conta: number, senha: string, cliente: Pessoa_fisica): void {
  
  deposito(valor, numero_conta, senha, cliente)
  menu_conta()
}

/**
 * @description Função responsável por efetuar a transação de saque
 */
async function sacar(): Promise<void> {

  const cpf   = String(await getInput('digite seu cpf: '))
  const conta = Number(await getInput('digite seu numero_da_conta: '))
  const valor = Number(await getInput('digite o valor que deseja depositar: '))
  const senha = String(await getInput('digite seu senha: '))

  console.clear()
  let cliente = filtrar_cliente(cpf)

  if(cliente != false){
    realizar_saque(valor, conta, senha, cliente)
    return
  }

  Error.clienteNaoEncontrado()
  menu_conta()
}

function realizar_saque(valor: number, numero_conta: number, senha: string, cliente: Pessoa_fisica): void {
  
  saque(valor, numero_conta, senha, cliente)
  menu_conta()
}


/**
 * @description Função responsável por exibir o extrato da conta do usuario
 */
async function extrato(): Promise<void> {

  const cpf   = String(await getInput('digite seu cpf: '))
  const conta = Number(await getInput('digite seu numero_da_conta: '))

  console.clear()
  
  let cliente = filtrar_cliente(cpf)
  
  if(cliente != false){
    ver_extrato(conta, cliente)
    return
  }

  Error.clienteNaoEncontrado()
  menu_conta()
}

function ver_extrato(numero_conta: number, cliente: Pessoa_fisica): void {
  
  let extrato = extrato_conta(numero_conta, cliente)
  console.log(extrato)
  menu_conta()
}


/**
 * @description Função responsavem por encerrar o App.
 */
function sair(): void {

  console.log(TELAS.template('Obrigado por usar!'))
  rl.close();
} 



// [FLUXO DE TELAS]


/**
 * @description Função responvável por exebir a tela de operações assim que o usuario
 * se logar com uma conta no sistema. possibilita criar depositos, sacar dinheiro e ver
 * e ver extrato bancário
 */
async function menu_conta(): Promise<void> {

  const opcao = String(await getInput(TELAS.tela_conta)) as opcao_menu
  
  escolhaMenu(opcao)
} 

function escolhaMenu(opcao: opcao_menu): void {
  
  switch(opcao.toLowerCase()){
    case 'a': { console.clear(); depositar();  break; }
    case 'b': { console.clear(); sacar();      break; }
    case 'c': { console.clear(); extrato();    break; }
    case 'x': { console.clear(); APP();        break; }
    default:  { console.clear(); menu_conta(); break; }
  }
}


/**
* @description Função que exibe uma tela de cadastro para o usuario, possibilitando
* cadastrar um novo usuario no sistema ou criar uma nova conta.
*/
async function cadastrar(): Promise<void> {

  const opcao = String(await getInput(TELAS.tela_cadastro)) as opcao_cadastro
  
  escolhaCadastro(opcao)
} 

function escolhaCadastro(opcao: opcao_cadastro): void {
  
  switch(opcao.toLowerCase()){
    case 'a': { console.clear(); novo_user();  break; }
    case 'b': { console.clear(); nova_conta(); break; }
    case 'x': { console.clear(); APP();        break; }
    default:  { console.clear(); cadastrar();  break; }
  }
}



/**
 * @description Função principal do sistema, responsável por iniciar o sistema e
 * exibir a tela inicial para o usuarios.
 */
async function APP(): Promise<void> {

  const opcao = String(await getInput(TELAS.tela_inicial)) as opcao_app
  
  escolhaAPP(opcao)
}

function escolhaAPP (opcao: opcao_app): void {
  
  switch (opcao.toLowerCase()){
    case 'a': { console.clear(); menu_conta(); break; }
    case 'b': { console.clear(); cadastrar();  break; }
    case 'x': { console.clear(); sair();       break; }
    default:  { console.clear(); APP();        break; }
  }
}

//run...
APP()