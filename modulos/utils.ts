import * as fs from 'fs';
import * as path from 'path';

/**
 * @description namespace UTILS agrupa algumas funções que podem ser uteis durante
 * o desenvolvimento do código ou em algum metodo.
 */
export namespace UTILS {

  export const create_Log = (message: string) => {
    const log_file_path = path.join(new URL('.', import.meta.url).pathname, 'log.txt')
    const log_entry     = `${new Date().toISOString()} - ${message}\n`

    fs.appendFile(log_file_path, log_entry, (err) => {
      if(err){
        console.log('Erro ao anexar log:', err)
      }
    })
  };
  
  export const now = () => {
    return new Date().toISOString()
  };

  export const gerar_senhar = () => {
    let caracteres = 'abcdefghijklmnopqrstuvxywz1234567890-_!@#*/$%&'
    let senha      = ''
    
    for (let i = 0; i < 7; i++){
      let index = Math.floor(Math.random() * caracteres.length)
      senha += caracteres[index]
    }
    return senha
  };

  export const nascimento = (data: string) => {
    let [ dia, mes, ano ] = String(data).split('/').map(parseInt)
    return new Date(ano, mes, dia)
  };
  
};