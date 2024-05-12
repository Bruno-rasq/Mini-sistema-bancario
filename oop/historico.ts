import { historico, transacao } from '../interfaces'

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

  nova_transacao(tipo: string, valor: number, data:string): void {
    this.transacoes.push({
      tipo: tipo,
      valor: valor,
      data: data
    })
  }
};