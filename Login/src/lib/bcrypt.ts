import bcrypt from 'bcrypt'

function VerificarSenha(senha: string, senhaHash: string) {
    return bcrypt.compare(senha,senhaHash)
}

export default VerificarSenha