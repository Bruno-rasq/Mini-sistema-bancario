import { Conta_corrente }         from './contas'
import { Saque, Deposito }        from './transacoes'
import { pessoa_fisica, cliente } from '../contracts/interfaces'
import { Logger, LogFilePath }    from './logger'

/**
 * @class Cliente
 * @augments subclasse - Pessoa_fisica
 * 
 * @description Classe responsavel por armazenar os dados dos clientes.
 */
class Cliente implements cliente {
  
  public endereco: string
  public contas:   Conta_corrente[]

  constructor(endereco: string){
    this.endereco = endereco
    this.contas   = []
  }

  public adicionar_conta(conta: Conta_corrente){
    this.contas.push(conta)
  }

  public realizar_transacao(conta: Conta_corrente, transacao: Saque | Deposito ) {
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
export class Pessoa_fisica extends Cliente implements pessoa_fisica {

  public nome:            string
  public data_nascimento: Date
  public cpf:             string

  constructor(endereco: string, nome: string, ddata_nascimento: Date, cpf: string){
    super(endereco)
    this.nome            = nome
    this.data_nascimento = ddata_nascimento
    this.cpf             = cpf
    this.log()
  }

  private log(){
    let msg = `CLIENTE CADASTRADO ${this.nome}-${this.cpf}`
    Logger.registrar(msg, LogFilePath.OOP)
  }
  
};