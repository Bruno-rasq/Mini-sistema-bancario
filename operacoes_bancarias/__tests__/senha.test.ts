import { verificar_senha } from '../verificar_senha'

describe('Verificacao de senha', () => {

  it('senha correta', () => {
    let senhainput = '1234'
    let senhauser = '1234'

    expect(verificar_senha(senhainput, senhauser)).toBe(true)
  })

  it('senha incorreta', () => {
    let senhainput = '1tij34'
    let senhauser = '1234'

    expect(verificar_senha(senhainput, senhauser)).toBe(false)
  })
  
})