import { now } from '../getDateTime'

describe('capturando o momento no tempo', () => {

  let time1: string = ''
  let time2: string = ''

  beforeAll(() => {
    time1 = now()
    time2 = now()
  })

  test('dois times devem ser iguais', () => {
    expect(time1).toEqual(time2)
  })

  test('retorno data e hora atual em são paulo no formato correto', () => {
    const regEx = /^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/;

    expect(time1).toMatch(regEx)
  })
  
})