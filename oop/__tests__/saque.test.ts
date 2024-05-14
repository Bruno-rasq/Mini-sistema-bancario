import { Saque } from '../transacoes';

describe('Classe Saque', () => {
  
  it('deve criar uma nova transação de saque', () => {
    const valor = 100;
    const saque = new Saque(valor);
    expect(saque.Valor()).toBe(valor);
  });

});