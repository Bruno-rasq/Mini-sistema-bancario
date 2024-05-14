/**
 * @description namespace UTILS agrupa algumas funções que podem ser uteis durante
 * o desenvolvimento do código ou em algum metodo.
 */
export namespace UTILS {

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