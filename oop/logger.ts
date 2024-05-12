import * as fs from 'fs';
import { now } from '../modulos/getDateTime';

export enum LogFilePath {
    ROOT = './logs.txt',
    OOP = './oop/logs_oop.txt',
    OTHER = './other/logs_other.txt'
}

/**
 * @class Logger
 * @description - Classe responsável por guardar logs passando a mensagem e o path 
 */
export class Logger {

  mensagem: string
  
  constructor(mensagem: string){
    this.mensagem = mensagem
  }

  static criar_log(msg: string, path: string) {
    
    const log_entry = `${now()} - ${msg}\n`

    fs.appendFile(path, log_entry, (err) => {
      if(err){
        console.log('Erro ao anexar log:', err)
      }
    })
  }

  static registrar(msg: string, path: string): void {
    this.criar_log(msg, path)
  }

  static log(msg: string): void {
    console.log(msg)
  }
}