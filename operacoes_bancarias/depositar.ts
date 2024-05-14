import { Pessoa_fisica } from '../oop/clientes'
import { Deposito } from '../oop/transacoes'
import { Error } from '../oop/error'
import { TELAS } from '../contrib/screens'
import { Logger } from '../oop/logger'
import { recuperar_conta_cliente } from './recuperar_conta'
import { verificar_senha } from './verificar_senha'


/**
 * @description Cria uma nova transação de deposito e realiza a transação se a senha passada
 * coincidir com a senha cadastrada da conta
 */
export function depositar (valor: number, numero_conta: number, senha: string, cliente: Pessoa_fisica) {
  
  let conta = recuperar_conta_cliente(cliente, numero_conta)

  if(conta != false){
    let deposito     = new Deposito(valor)
    let senhaCorreta = verificar_senha(senha, conta.Senha)

    if(senhaCorreta) {
      Logger.log(TELAS.template('Deposito concluido!'))
      cliente.realizar_transacao(conta, deposito)
      return
    }
    
    Error.senhaIncorreta()
  }
  
  Error.contaNaoExistente()
};