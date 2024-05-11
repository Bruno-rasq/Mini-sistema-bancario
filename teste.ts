import * as op from './operacoes';

// criando alguns clientes e contas ...

op.criar_cliente("Rua D, 321", "Ana Pereira", new Date(1995, 8, 10), "321.654.987-00")
op.criar_cliente("Rua A, 123", "João Silva", new Date(1990, 5, 15), "123.456.789-00")
op.criar_cliente("Rua D, 321", "Ana Pereira", new Date(1995, 8, 10), "321.654.987-00")
op.criar_cliente("Avenida E, 654", "Carla Lima", new Date(1982, 12, 5), "789.123.456-00")

op.nova_conta("321.654.987-00", "Ana Pereira", '1234') // ok
op.nova_conta("987.654.321-00", "Maria Oliveira", '5674') // nenhum cliente com cpf cadastrado

op.depositar(5000, 1, '1234', op.clientes[0])
op.sacar(100, 1, '1234', op.clientes[0])
op.sacar(100, 1, '1234', op.clientes[0])

let extrato = op.ver_extrato(1, op.clientes[0])
console.log(extrato)

let cliente_ana = op.filtrar_cliente("321.654.987-00")

if (cliente_ana != false){

  let conta_ana = op.recuperar_conta_cliente(cliente_ana, 1)
  console.log(cliente_ana)
  console.log(conta_ana)
}