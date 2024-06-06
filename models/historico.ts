import { historico, transacao } from '../contracts/interfaces'
import { Logger, LogFilePath }  from './logger'

/**
 * @class Historico
 * 
 * @description Classe responsavel por guardar todas as transferencias feitas da
 * classe @class Conta_corrente
 *
 * @remarks Esta classe é exportada para que possa ser utilizada em interfaces.ts
 */
export class Historico implements historico  {
  
  public transacoes: transacao[]
  
  constructor(){
    this.transacoes = []
  }

  get Transacoes() {
    return this.transacoes
  }

  public nova_transacao(tipo: string, valor: number, data:string): void {
    
    this.transacoes.push({
      tipo: tipo,
      valor: valor,
      data: data
    })

    // ATENCAO: o codigo deve registrar um log da nova transaçõa, comentei esse trecho para os teste
    // let msg = `${tipo}-R$${valor.toFixed(2)}`
    // this.log(msg)
  }

  private log(msm: string){
    Logger.registrar(msm, LogFilePath.OOP)
  }
  
};