import { useState, MouseEvent } from 'react'
import { UserBoxForm } from '../userBoxForm/UserBoxForm'
import * as C from './styles'

type Props = {
    getEmail: (value: string) => void,
    getPassword: (value: string) => void,
    getName: (value: string) => void,
    entrar: () => void,
    singUp: (e: MouseEvent<HTMLButtonElement>) => void
}

export const SignUp = ({ getEmail, getPassword, getName, entrar, singUp }: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleEmail = (value: string) => {
        setEmail(value.toLowerCase())
        getEmail(value.toLowerCase())
    }
    const handlePassword = (value: string) => {
        setPassword(value)
        getPassword(value)
    }
    const handleName = (value: string) => {
        setName(value)
        getName(value)
    }

    const handleLoginArea = () => {
        entrar()
    }

    const handleAuthCadastro = (e: MouseEvent<HTMLButtonElement>) => {
        singUp(e)
    }

    return (
        <C.Container>
            <h3>Cadastre-se</h3>
            <p>Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
            <div className="login-box">
                <form action="">
                    <div className='boxUserInput'>
                        <UserBoxForm name='Nome' type='text' setValue={handleName} value={name} />
                        <UserBoxForm name='Email' type='text' setValue={handleEmail} value={email} />
                        <UserBoxForm name='Senha' type='password' setValue={handlePassword} value={password} />
                    </div>
                    <div className='box-buttom'>
                        <button className='submit' onClick={handleAuthCadastro}>Cadastrar</button>
                    </div>
                    <p className='novoCadastro'>Já possui uma conta? <span onClick={handleLoginArea} >Faça login</span></p>
                </form>
            </div>
        </C.Container>
    )
}