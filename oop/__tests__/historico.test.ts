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
    historico.nova_transacao('receita', 100, '2024-05-12');
    expect(historico.Transacoes).toEqual([
      { tipo: 'receita', valor: 100, data: '2024-05-12' }
    ]);
  });
  
});