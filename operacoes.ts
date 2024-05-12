import * as POO  from './classes';
import { TELAS } from './screens';


let numero_de_contas: number = 0;
let clientes: POO.Pessoa_fisica[] = [];


/**
 * @description Função que cadastrar um novo cliente no sistema caso o cliente já não exista
 * @returns {void} retorna um log se cliente foi cadastrado ou se já existe
 */
export function criar_cliente(endereco: string, nome: string, nasci: Date, cpf: string): void {

  let cliente_existe = filtrar_cliente(cpf)
  
  if (cliente_existe === false){
    const cliente = new POO.Pessoa_fisica(endereco, nome, nasci, cpf)
    clientes.push(cliente)
    console.log(`Cliente ${nome} cadastrado com sucesso!`)
    return
  } 
  
  console.log(`cliente ${nome} ja esta cadastrado!`)
};


/**
 * @description Filtra um cliente especifico de uma lista de clientes cadastrados no sistema.
 * @retuns { POO.Pessoa_fisica | false } retorna o cliente caso ele esteja cadastrado, ou false
 */
export function filtrar_cliente(cpf: string): POO.Pessoa_fisica | false {
  for (let cliente of clientes){
    if(cliente.cpf === cpf){
      return cliente
    }
  }
  return false
};


/**
 * @description Função que cadastra um conta e vincula ao cliente de CPF correspondente.
 * @returns {void} retorna um log
 */
export function nova_conta(cpf: string, nome: string, senha: string): void {
  let cliente_cadastrado = filtrar_cliente(cpf)

  if(cliente_cadastrado ===  false){
    console.log('nenhum cliente com este cpf cadastrado!')
    return
  }

  let numero_conta = numero_de_contas + 1
  let nova_conta   = new POO.Conta_corrente(numero_conta, nome, senha)
  
  cliente_cadastrado.adicionar_conta(nova_conta)

  let nome_conta   = cliente_cadastrado.nome
  let cpf_conta    = cliente_cadastrado.cpf
  let num_conta    = nova_conta.Numero_conta
  let senha_conta  = nova_conta.Senha
    
  console.log(TELAS.conta_criada(nome_conta, cpf_conta, senha_conta, String(num_conta)))
  
  numero_de_contas++ 
};


/**
 * @description Cada cliente pode ter 1 ou mais contas cadastradas, a função é responsavel
 * por retornar a conta especifica que o cliente deseja operar.
 * @returns { POO.Conta_corrente | undefinde }
 */
export function recuperar_conta_cliente (cliente: POO.Pessoa_fisica, numero_conta: number) {
  if (cliente.contas.length === 0) {
    console.log('cliente não possui conta!')
    return  
  }

  for(let conta of cliente.contas){
    if(conta.Numero_conta === numero_conta){
      return conta
    }
  }
}; 


/**
 * @description Cria uma nova transação de deposito e realiza a transação se a senha passada
 * coincidir com a senha cadastrada da conta
 */
export function depositar (valor: number, numero_conta: number, senha: string, cliente: POO.Pessoa_fisica) {
  let conta    = recuperar_conta_cliente(cliente, numero_conta)
  let deposito = new POO.Deposito(valor)
  
  if(senha === conta?.Senha){
    console.log(TELAS.template('Deposito concluido!'))
    cliente.realizar_transacao(conta, deposito)
    return
  }
};


/**
 * @description Cria uma nova transação de saque e realiza a transação se a senha passada
 * coincidir com a senha cadastrada da conta
 */
export function sacar (valor: number, numero_conta: number, senha: string, cliente: POO.Pessoa_fisica) {
  let conta = recuperar_conta_cliente(cliente, numero_conta)
  let saque = new POO.Saque(valor)
  
  if(senha === conta?.Senha){
    console.log(TELAS.template('Saque concluido'))
    cliente.realizar_transacao(conta, saque)
    return
  }
};


/**
 * @description Função que retorna o historico de transações da conta
 * @returns {string} extrato
 */
export function ver_extrato (numero_conta: number, cliente: POO.Pessoa_fisica) {
  let conta = recuperar_conta_cliente(cliente, numero_conta)

  if (conta){ // se conta existir
    
    let extrato = ''
    if(conta.Historico_conta.Transacoes.length === 0){
      extrato = 'nenhuma transacao realizada no momento :/'
      return TELAS.template(extrato)
    }

    for(let transacao of conta.Historico_conta.Transacoes){
      extrato += `[${transacao.data}] - ${transacao.tipo.toLocaleUpperCase()} valor: R$ ${transacao.valor.toFixed(2)}\n`
    }

    extrato += `SALDO TOTAL: R$ ${conta.Saldo}`
    return TELAS.template(extrato)
  }
};