import { Historico } from '../models/historico'
import { Conta }     from '../models/contas'


export interface conta {
  
  readonly agencia:   string
  readonly numero:    number
           cliente:   string
           historico: Historico
};


export interface pessoa_fisica {
  
  nome:            string
  data_nascimento: Date
  cpf:             string
};


export interface cliente {
  
  endereco: string
  contas:   Conta[]
};


export interface historico {
  
  transacoes: transacao[]
  nova_transacao: (tipo: string, valor: number, data:string) => void
};


export interface transacao {
  
  tipo:  string
  valor: number
  data:  string
};