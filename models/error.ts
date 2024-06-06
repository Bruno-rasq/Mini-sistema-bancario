import { TELAS }               from '../contrib/screens'
import { Pessoa_fisica }       from './clientes'
import { Logger, LogFilePath } from './logger'


// TODO: registrar todos os erros em logs
export class Error {

  static limiteExcedido(): void {
    let erro = TELAS.template('Valor limite excedido!')
    console.log(erro)
  }

  static limiteSaquesExcedido(): void {
    let erro = TELAS.template('Limite de saques excedidos!')
    console.log(erro)
  }

  static saldoInsuficiente(): void {
    let erro = TELAS.template('Saldo insuficiente!')
    console.log(erro)
  }

  static valorInvalido(): void {
    let erro = TELAS.template('valor inválido!')
    console.log(erro)
  }

  static clienteNaoEncontrado(): void {
    let erro = TELAS.template('cliente não encontrado!')
    console.log(erro)
  }

  static erroDeTransacao(): void {
    let erro = TELAS.template('Houve um erro de Transação!')
    console.log(erro)
  }

  static clienteSemContaregistrada(cliente: Pessoa_fisica): void {
    let erro = TELAS.template(`Cliente ${cliente.nome} não possue contas registradas!`)
    console.log(erro)

    Logger.registrar(erro, LogFilePath.ERROR)
  }

  static senhaIncorreta(): void {
    let erro = TELAS.template('Senha incorreta!')
    console.log(erro)
  }

  static contaNaoExistente(): void {
    let erro = TELAS.template('Conta solicitada não existe!')
    console.log(erro)
  }
}