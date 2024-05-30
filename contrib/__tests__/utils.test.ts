import { UTILS } from '../utils'

describe('testando alguns metodos auxiliares', () => {

  describe('testando metodo gerador de senhas', () => {
    let password: string = ''

    beforeAll(() => {
      password = UTILS.gerar_senhar()
    })

    it('Senhas devem ser diferentes', () => {
      const passwordTest = UTILS.gerar_senhar()
      expect(password).not.toEqual(passwordTest)
    })

    test('senha deve conter 8 caracteres', () => {
      expect(password.length).toEqual(8)
      expect(password.length).not.toBeGreaterThan(8)
      expect(password.length).not.toBeLessThan(8)
    })
    
  })


})