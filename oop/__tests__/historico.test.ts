import { Historico } from '../historico'

describe('Classe Historico', () => {
  let historico: Historico;

  beforeEach(() => {
    historico = new Historico();
  });

  it('deve inicializar transacoes vazio', () => {
    expect(historico.Transacoes).toEqual([]);
  });

  it('deve adicionar uma nova transacao', () => {
    
    historico.nova_transacao('deposito', 100, '2024-05-12');
    historico.nova_transacao('saque', 100, '2024-05-12');
    
    expect(historico.Transacoes).toEqual([
      { tipo: 'deposito', valor: 100, data: '2024-05-12' },
      { tipo: 'saque', valor: 100, data: '2024-05-12' }
    ]);

    expect(historico.Transacoes.length).toBe(2)
  });
  
});