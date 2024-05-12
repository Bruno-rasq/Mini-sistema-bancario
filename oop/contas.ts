import { UTILS } from '../modulos/utils'
import { conta } from '../interfaces'
import { Historico } from './historico'

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

  get Saldo() {
    return this.saldo
  }

  get Senha() {
    return this.senha
  }

  get Numero_conta() {
    return this.numero
  }

  get Historico_conta () {
    return this.historico
  }

  depositar(valor: number): boolean {
    
    if(valor > 0) {
      this.saldo += valor
      
      let msg = `DEPOSITO - cliente:${this.cliente} conta:${this.Numero_conta} - valor:R$${valor.toFixed(2)}`
      UTILS.create_Log(msg) // descartar
      
      return true
    }
    return false
  }

  sacar(valor: number ): boolean {
    
    if (valor > 0 && valor < this.saldo) {

      this.saldo -= valor
      return true
    } 

    return false
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
  }

  sacar(valor: number): boolean {
    
    let limiteSaquesExcedido = this.Historico_conta.transacoes.length > this.limite_saques
    let limiteExcedido       = valor > this.limite_por_saque

    if (limiteExcedido) {
      
      let msg = `SAQUE - cliente:${this.cliente} conta:${this.Numero_conta} - Valor maximo de saque excedido! valor:R$${valor.toFixed(2)}`
      UTILS.create_Log(msg) // descartar
      
      console.log('Valor maximo de saque excedido!')
      return false
      
    } else if (limiteSaquesExcedido) {
      
      let msg = `SAQUE - cliente:${this.cliente} conta:${this.Numero_conta} - limite de saques diarios excedido! valor:R$${valor.toFixed(2)}`
      UTILS.create_Log(msg) // descartar
      
      console.log('limite de saques diarios excedido!')
      return false
    }

    let msg = `SAQUE - cliente:${this.cliente} conta:${this.Numero_conta} - valor:R$${valor.toFixed(2)}`
    UTILS.create_Log(msg) // descartar
    
    super.sacar(valor)
    return true
  }
};