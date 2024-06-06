import { Conta_corrente } from '../models/contas'
import { Pessoa_fisica }  from '../models/clientes'
import { Error }          from '../models/error'


/**
 * @description Cada cliente pode ter 1 ou mais contas cadastradas, a função é responsavel
 * por retornar a conta especifica que o cliente deseja operar.
 * @returns { POO.Conta_corrente | undefinde }
 */
export function recuperar_conta_cliente (cliente: Pessoa_fisica, numero_conta: number): false | Conta_corrente {
  
  if (cliente.contas.length === 0) {
    Error.clienteSemContaregistrada(cliente)
    return false
  }

  for(let conta of cliente.contas){
    if(conta.Numero_conta === numero_conta){
      return conta
    }
  }

  Error.contaNaoExistente()
  return false
}; 