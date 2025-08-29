import bcrypt from 'bcrypt'

async function Criptografar(senha: string) {
    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(senha, salt);
    return hashedPassword
}

export default Criptografar