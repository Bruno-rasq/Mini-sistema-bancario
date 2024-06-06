import { Error }                   from '../models/error'
import { Pessoa_fisica }           from '../models/clientes'
import { TELAS }                   from '../contrib/screens'
import { recuperar_conta_cliente } from './recuperar_conta'

/**
 * @description Função que retorna o historico de transações da conta
 * @returns {string} extrato
 */
export function ver_extrato (numero_conta: number, cliente: Pessoa_fisica) {
  let conta = recuperar_conta_cliente(cliente, numero_conta)

  if (conta){ // se conta existir
    
    let extrato = ''
    if(conta.Historico_conta.Transacoes.length === 0){
      extrato = 'nenhuma transacao realizada no momento :/'
      return TELAS.template(extrato)
    }

    for(let transacao of conta.Historico_conta.Transacoes){
      extrato += `[${transacao.data}] - ${transacao.tipo.toLocaleUpperCase()}-valor:R$ ${transacao.valor.toFixed(2)}\n`
    }

    extrato += `SALDO TOTAL: R$ ${conta.Saldo}`
    return TELAS.template(extrato)
  }

  Error.clienteSemContaregistrada(cliente)
};