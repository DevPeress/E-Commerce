import bcrypt from 'bcrypt'

function Criptografar(senha: string) {
    return bcrypt.hash(senha,10)
}

export default Criptografar