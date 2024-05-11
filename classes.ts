import * as INTERFACES from './interfaces';
import { UTILS } from './utils';


/**
 * @class Historico
 * 
 * @description Classe responsavel por guardar todas as transferencias feitas da
 * classe @class Conta_corrente
 *
 * @remarks Esta classe é exportada para que possa ser utilizada em interfaces.ts
 */
export class Historico implements INTERFACES.historico  {
  
  public transacoes: INTERFACES.transacao[]
  
  constructor(){
    this.transacoes = []
  }

  get Transacoes() {
    return this.transacoes
  }

  nova_transacao(tipo: string, valor: number, data:string): void {
    this.transacoes.push({
      tipo: tipo,
      valor: valor,
      data: data
    })
  }
};


/**
 * @class Conta
 * @augments subclasse - Conta_corrente
 * 
 * @description Classe que implementa as funções principais de cada conta gerada
 *
 * @remarks Esta classe é exportada para que possa ser utilizada em interfaces.ts
 */
export class Conta implements INTERFACES.conta {

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


/**
 * @class Cliente
 * @augments subclasse - Pessoa_fisica
 * 
 * @description Classe responsavel por armazenar os dados dos clientes.
 */
class Cliente implements INTERFACES.cliente {
  
  public endereco: string
  public contas:   Conta_corrente[]

  constructor(endereco: string){
    this.endereco = endereco
    this.contas   = []
  }

  adicionar_conta(conta: Conta_corrente){
    this.contas.push(conta)
  }

  realizar_transacao(conta: Conta_corrente, transacao: Saque | Deposito ) {
    transacao.Registrar(conta)
  }
  
};


/**
 * @class Pessoa_fisica
 * @extends Cliente
 * 
 * @description Classe que instancia um  novo cliente.
 *
 * @remarks Esta classe é exportada para que possa ser utilizada em index.ts
 */
export class Pessoa_fisica extends Cliente implements INTERFACES.pessoa_fisica {

  public nome:            string
  public data_nascimento: Date
  public cpf:             string

  constructor(endereco: string, nome: string, ddata_nascimento: Date, cpf: string){
    super(endereco)
    this.nome            = nome
    this.data_nascimento = ddata_nascimento
    this.cpf             = cpf
  }
};


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
  
  Registrar(conta: Conta_corrente) {
    let sucesso = conta.sacar(this.Valor())

    if(sucesso){
      conta.historico.nova_transacao('SAQUE', this.Valor(), UTILS.now())
    }
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
  
  Registrar(conta: Conta_corrente) {
     
    let sucesso = conta.depositar(this.Valor())

    if(sucesso){
      conta.historico.nova_transacao('DEPOSITO', this.Valor(), UTILS.now())
    }
  }
  
};