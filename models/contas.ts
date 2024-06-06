import { Logger, LogFilePath } from './logger'
import { conta }               from '../contracts/interfaces'
import { Historico }           from './historico'
import { Error }               from './error'

/**
 * @class Conta
 * @augments subclasse - Conta_corrente
 * 
 * @description Classe que implementa as funções principais de cada conta gerada
 *
 * @remarks Esta classe é exportada para que possa ser utilizada em interfaces.ts
 */
export class Conta implements conta {

  private  saldo:     number
  private  senha:     string
  readonly agencia:   string
  readonly numero:    number
  public   cliente:   string
  public   historico: Historico
  
  constructor(numero:number, cliente: string, senha: string){
    this.saldo     = 0
    this.agencia   = '0001'
    this.numero    = numero
    this.cliente   = cliente
    this.senha     = senha
    this.historico = new Historico()
  }

  get Saldo(): number {
    return this.saldo
  }

  set Saldo(valor: number) {
    this.saldo -= valor
  }

  get Senha(): string {
    return this.senha
  }

  get Numero_conta(): number {
    return this.numero
  }

  get Historico_conta(): Historico {
    return this.historico
  }

  public depositar(valor: number): boolean {
    
    if(valor > 0) {
      this.saldo += valor
      return true
    }
    return false
  }

  public sacar(valor: number): void {
    this.Saldo = valor
  }
  
};


/**
 * @class Conta_corrente
 * @extends Conta
 * 
 * @description Classe responsavel por armazenar os limites de transferencias diarias.
 *
 * @remarks Esta classe é exportada para que possa ser utilizada em index.ts
 */
export class Conta_corrente extends Conta {

  public limite_por_saque: number 
  public limite_saques:    number
  
  constructor(numero:number, cliente: string, senha: string){
    super(numero, cliente, senha)
    this.limite_por_saque = 500
    this.limite_saques    = 3
    this.log()
  }

  private log(): void {
    let msg = `NOVA CONTA: cliente:${this.cliente}-numero:${this.Numero_conta}_agencia:${this.agencia}`
    Logger.registrar(msg, LogFilePath.OOP)
  }

  private verificarLimites(valor: number): boolean {
    let limiteSaquesExcedido = this.Historico_conta.transacoes.length > this.limite_saques
    let limiteExcedido       = valor > this.limite_por_saque

    if (limiteExcedido) {

      Error.limiteExcedido()
      return false

    } else if (limiteSaquesExcedido) {

      Error.limiteSaquesExcedido()
      return false
    }
    
    return true
  }

  private verificarValor(valor: number): boolean {
    if(valor <= 0){

      Error.valorInvalido()
      return false
      
    } else if(valor > this.Saldo){

      Error.saldoInsuficiente()
      return false
    }
    return true
  }

  private verificarSaldo(): boolean {
    return this.Saldo === 0 ? false : true
  }

  public sacar(valor: number): boolean {
    
    let verificarLimites = this.verificarLimites(valor)
    let verificarvalor   = this.verificarValor(valor)
    let verificarsalco   = this.verificarSaldo()

    if (verificarLimites && verificarvalor && verificarsalco) {
      
      super.sacar(valor)
      return true
    } 
    return false
  }
  
};