import { Pessoa_fisica } from '../oop/clientes'
import { Logger } from '../oop/logger'
import { filtrar_cliente } from './filtrar_usuarios'

export let clientes: Pessoa_fisica[] = [];


/**
 * @description Função que cadastrar um novo cliente no sistema caso o cliente já não exista
 * @returns {void} retorna um log se cliente foi cadastrado ou se já existe
 */
export function criar_cliente(endereco: string, nome: string, nasci: Date, cpf: string): void {

  let cliente_existe = filtrar_cliente(cpf)
  
  if (cliente_existe === false){
    const cliente = new Pessoa_fisica(endereco, nome, nasci, cpf)
    clientes.push(cliente)
    Logger.log(`Cliente ${nome} cadastrado com sucesso!`)
    return
  } 
  
  Logger.log(`cliente ${nome} ja esta cadastrado!`)
};