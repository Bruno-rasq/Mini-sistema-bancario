import { criar_cliente }                from './cadastrar_usuario'
import { nova_conta as Nova_conta }     from './nova_conta'
import { rl }                           from '../contrib/readline'
import { TELAS }                        from '../contrib/screens'
import { UTILS }                        from '../contrib/utils'
import { Error }                        from '../oop/error'
import { depositar as deposito }        from './depositar'
import { filtrar_cliente }              from './filtrar_usuarios'
import { sacar as saque }               from './sacar'
import { ver_extrato as extrato_conta } from './extrato'
import { getInput }                     from '../contrib/getInput'

const modules = {
  criar_cliente,
  Nova_conta,
  rl,
  TELAS,
  UTILS,
  Error,
  deposito,
  filtrar_cliente,
  saque,
  extrato_conta,
  getInput
}

export default modules