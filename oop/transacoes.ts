import { now }            from '../modulos/getDateTime'
import { Conta_corrente } from './contas'
import { Error }          from './error'


/**
 * @abstract
 * @class Transação
 * @augments subclasse - Deposito
 * @augments subclasse - Saque
 */
abstract class Transacao {
  abstract Valor(): number
  abstract Registrar(conta: Conta_corrente): void
};


/**
 * @class Saque
 * @extends Transação
 * 
 * @description Classe que instancia uma nova transação de saque.
 *
 * @remarks Esta classe é exportada para que possa ser utilizada em index.ts
 */
export class Saque extends Transacao {
  
  private valor: number;

  constructor(v: number) {
    super();
    this.valor = v;
  }

  Valor() {
    return this.valor
  }
  
  public Registrar(conta: Conta_corrente) {
    let sucesso = conta.sacar(this.Valor())

    if(sucesso != false){
      
      conta.historico.nova_transacao(
        this.constructor.name.toUpperCase(), 
        this.Valor(), 
        now()
      )
      return
    }

    Error.erroDeTransacao()
  }
  
};


/**
 * @class Deposito
 * @extends Transação
 * 
 * @description Classe que instancia uma nova transação de deposito.
 *
 * @remarks Esta classe é exportada para que possa ser utilizada em index.ts
 */
export class Deposito extends Transacao {
  
  private valor: number
  
  constructor(v: number){
    super()
    this.valor = v
  }

  Valor() {
    return this.valor
  }
  
  public Registrar(conta: Conta_corrente) {
     
    let sucesso = conta.depositar(this.Valor())

    if(sucesso != false ){
      
      conta.historico.nova_transacao(
        this.constructor.name.toUpperCase(), 
        this.Valor(), 
        now()
      )
      return
    }

    Error.erroDeTransacao()
  }
  
};