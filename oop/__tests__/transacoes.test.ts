import { Saque, Deposito } from '../transacoes';

describe('transacoes', () => {

  describe('classe Saque', () => {
    it('deve criar uma nova transação de saque', () => {
      const valor = 100;
      const saque = new Saque(valor);
      expect(saque.Valor()).toBe(valor);
    });
    
  });

  describe('classe Deposito', () => {
    it('deve criar uma nova transação de deosito', () => {
      const valor = 100;
      const deposito = new Deposito(valor);
      expect(deposito.Valor()).toBe(valor);
    });
  })

});