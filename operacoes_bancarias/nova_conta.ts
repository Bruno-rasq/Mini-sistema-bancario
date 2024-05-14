import { filtrar_cliente } from './filtrar_usuarios'
import { Logger } from '../oop/logger'
import { Conta_corrente } from '../oop/contas'
import { TELAS } from '../contrib/screens'


let numero_de_contas: number = 0;


/**
 * @description Função que cadastra um conta e vincula ao cliente de CPF correspondente.
 * @returns {void} retorna um log
 */
export function nova_conta(cpf: string, nome: string, senha: string): void {
  let cliente_cadastrado = filtrar_cliente(cpf)

  if(cliente_cadastrado ===  false){
    Logger.log('nenhum cliente com este cpf cadastrado!')
    return
  }

  let numero_conta = numero_de_contas + 1
  let nova_conta   = new Conta_corrente(numero_conta, nome, senha)
  
  cliente_cadastrado.adicionar_conta(nova_conta)

  let nome_conta   = cliente_cadastrado.nome
  let cpf_conta    = cliente_cadastrado.cpf
  let num_conta    = nova_conta.Numero_conta
  let senha_conta  = nova_conta.Senha
    
  Logger.log(TELAS.conta_criada(nome_conta, cpf_conta, senha_conta, String(num_conta)))
  
  numero_de_contas++ 
};