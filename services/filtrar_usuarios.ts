import { Pessoa_fisica } from '../models/clientes'
import { clientes }      from './cadastrar_usuario'

/**
 * @description Filtra um cliente especifico de uma lista de clientes cadastrados no sistema.
 * @retuns { POO.Pessoa_fisica | false } retorna o cliente caso ele esteja cadastrado, ou false
 */
export function filtrar_cliente(cpf: string): Pessoa_fisica | false {
  for (let cliente of clientes){
    if(cliente.cpf === cpf){
      return cliente
    }
  }
  return false
};