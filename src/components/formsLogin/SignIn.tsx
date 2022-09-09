import { useState, MouseEvent } from 'react'
import { UserBoxForm } from '../userBoxForm/UserBoxForm'
import * as C from './styles'

type Props = {
    getEmail: (value: string) => void,
    getPassword: (value: string) => void,
    cadastrar: () => void,
    singIn: (e: MouseEvent<HTMLButtonElement>) => void
}

export const SignIn = ({ getEmail, getPassword, cadastrar, singIn }: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (value: string) => {
        setEmail(value.toLowerCase())
        getEmail(value.toLowerCase())
    }
    const handlePassword = (value: string) => {
        setPassword(value)
        getPassword(value)
    }

    const handleCadastar = () => {
        cadastrar()
    }

    const handleAuthLogin = (e: MouseEvent<HTMLButtonElement>) => {
        singIn(e)
    }

    return (
        <C.Container>
            <h3>Entrar</h3>
            <p>Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
            <div className="login-box">
                <form action="">
                    <div className='boxUserInput'>
                        <UserBoxForm name='Email' type='text' setValue={handleEmail} value={email} />
                        <UserBoxForm name='Senha' type='password' setValue={handlePassword} value={password} />
                    </div>
                    <div className='box-buttom'>
                        <button className='submit' onClick={handleAuthLogin}>Entrar</button>
                    </div>
                    <p className='novoCadastro'>Não possui uma conta? <span onClick={handleCadastar}>Criar conta</span></p>
                </form>
            </div>
        </C.Container>
    )
}