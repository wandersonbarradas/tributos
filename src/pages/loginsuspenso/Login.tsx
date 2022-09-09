import * as C from "./style";
import { ChangeEvent, useEffect, useState } from "react";
import { MouseEvent } from "react";
import Api from '../../Api'
import { doLogin } from "../../Api";
import { AddUserType } from '../../Api'
import { Validate, ValidateEmail, ValidateName, ValidatePassword } from '../../helpers/validador'
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";

type Props = {
    newUser: (user: AddUserType) => void;
}

export type ValidateType = {
    status: boolean;
    message: string;
}

export const Login = ({ newUser }: Props) => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginIn, setLoginIn] = useState(true)
    const [validateError, setValidateError] = useState('')
    const [modError, setModError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/login')
    }, [])

    const handleAuthCadastro = async (e: MouseEvent<HTMLButtonElement>) => {
        setLoading(true)
        e.preventDefault()
        handleClickModalError()
        let emailValid = ValidateEmail(email)
        let passwordValid = ValidatePassword(password)
        let nameValid = ValidateName(name)
        if (emailValid.status && passwordValid.status && nameValid.status) {
            let user = await Api.CadastrarAuth(email, password, name) as AddUserType
            if (user.id !== undefined) {
                newUser(user)
                doLogin(user.token)
                zerarCampos()
                navigate('/')
            } else {
                let error = user.toString()
                const result = Validate(error)
                setValidateError(result)
                setModError(true)
            }
        } else {
            let error;
            if (!nameValid.status) {
                error = nameValid.message
                setValidateError(error)
            } else if (!emailValid.status) {
                error = emailValid.message
                setValidateError(error)
            } else if (!passwordValid.status) {
                error = passwordValid.message
                setValidateError(error)
            }
            setModError(true)
        }
        setLoading(false)
    }

    const handleAuthLogin = async (e: MouseEvent<HTMLButtonElement>) => {
        setLoading(true)
        e.preventDefault()
        handleClickModalError()
        let emailValid = ValidateEmail(email)
        let passwordValid = ValidatePassword(password)
        if (emailValid.status && passwordValid.status) {
            let user = await Api.getLogin(email, password) as AddUserType
            if (user.id !== undefined) {
                newUser(user)
                doLogin(user.token)
                zerarCampos()
                navigate('/')
            } else {
                let error = user.toString()
                const result = Validate(error)
                setValidateError(result)
                setModError(true)
            }
        } else {
            let error;
            if (!emailValid.status) {
                error = emailValid?.message as string
                setValidateError(error)
            } else {
                error = passwordValid?.message as string
                setValidateError(error)
            }
            setModError(true)
        }
        setLoading(false)
    }

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.toLowerCase())
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleLoginArea = () => {
        setLoginIn(false)
        zerarCampos()
    }
    const handleCadastar = () => {
        setLoginIn(true)
        zerarCampos()
    }
    const handleClickModalError = () => {
        setModError(false)
        setValidateError('')
    }
    const zerarCampos = () => {
        setEmail('')
        setName('')
        setPassword('')
    }
    return (
        <C.Container error={modError}>
            {loading &&
                <Loading />
            }
            {!loading &&
                <div className="cardMain">
                    <div className="auth_error">
                        <div className="error_content">
                            {validateError}
                            <span onClick={handleClickModalError}>x</span>
                        </div>
                    </div>
                    {loginIn &&
                        <div className="card">

                            <h4 className="title">Log In!</h4>
                            <form>
                                <div className="field">
                                    <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path></svg>
                                    <input placeholder="Email" className="input-field" type="email" required onChange={handleEmail} />
                                </div>
                                <div className="field">
                                    <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path></svg>
                                    <input placeholder="Password" minLength={6} className="input-field" type="password" required onChange={handlePassword} />
                                </div>
                                <button className="btn" onClick={handleAuthLogin}>Login</button>
                            </form>
                            <button className="btn-link" onClick={handleLoginArea}>Cadastra-se</button>
                        </div>
                    }
                    {!loginIn &&
                        <div className="card">
                            <h4 className="title">Sign In!</h4>
                            <form>
                                <div className="field">
                                    <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path></svg>
                                    <input autoComplete="off" placeholder="Nome" className="input-field" type="text" onChange={handleName} />
                                </div>
                                <div className="field">
                                    <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path></svg>
                                    <input autoComplete="off" id="logemail" placeholder="Email" className="input-field" name="logemail" type="email" onChange={handleEmail} />
                                </div>
                                <div className="field">
                                    <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path></svg>
                                    <input autoComplete="off" id="logpass" placeholder="Password" className="input-field" name="logpass" type="password" onChange={handlePassword} />
                                </div>
                                <button className="btn" onClick={handleAuthCadastro}>Sign In </button>
                                <button className="btn-link" onClick={handleCadastar} >Entrar</button>
                            </form>
                        </div>
                    }
                </div>
            }
        </C.Container>
    )
}
