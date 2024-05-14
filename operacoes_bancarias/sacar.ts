import { Error } from '../oop/error'
import { Pessoa_fisica } from '../oop/clientes'
import { recuperar_conta_cliente } from './recuperar_conta'
import { verificar_senha } from './verificar_senha'
import { TELAS } from '../contrib/screens'
import { Logger } from '../oop/logger'
import { Saque } from '../oop/transacoes'


/**
 * @description Cria uma nova transação de saque e realiza a transação se a senha passada
 * coincidir com a senha cadastrada da conta
 */
export function sacar (valor: number, numero_conta: number, senha: string, cliente: Pessoa_fisica) {
  
  let conta = recuperar_conta_cliente(cliente, numero_conta)
  
  if(conta != false){
    let saque        = new Saque(valor)
    let senhaCorreta = verificar_senha(senha, conta.Senha)

    if(senhaCorreta) {
      Logger.log(TELAS.template('Deposito concluido!'))
      cliente.realizar_transacao(conta, saque)
      return
    }

    Error.senhaIncorreta()
  }

  Error.contaNaoExistente()
};