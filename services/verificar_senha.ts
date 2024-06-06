/**
 *@description Função responsavel por verificar se a senha está correta
 */
export function verificar_senha(senha_inserida: string, senha_correta: string): boolean {
  return senha_inserida === senha_correta
}