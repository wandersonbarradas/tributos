import { useEffect, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Api, { AddUserType, doLogin } from '../../Api';
import ImagemLogin from '../../assets/images/Invoice-amico.png'
import { Loading } from '../../components/loading/Loading';
import { Validate, ValidateEmail, ValidateName, ValidatePassword } from '../../helpers/validador';
import { SignIn } from '../../components/formsLogin/SignIn'
import { SignUp } from '../../components/formsLogin/SignUp'
import * as C from './styles'

type Props = {
    newUser: (user: AddUserType) => void;
}

export type ValidateType = {
    status: boolean;
    message: string;
}

export const NewLogin = ({ newUser }: Props) => {
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
    }, [navigate])

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
    const handleLoginArea = () => {
        setLoginIn(true)
        zerarCampos()
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
    const handleEmail = (value: string) => setEmail(value.toLowerCase())

    const handlePassword = (value: string) => setPassword(value)

    const handleName = (value: string) => setName(value)

    const handleCadastar = () => {
        setLoginIn(false)
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
            <div className="auth_error">
                <div className="error_content">
                    {validateError}
                    <span onClick={handleClickModalError}>x</span>
                </div>
            </div>
            {loading &&
                <Loading />
            }
            {!loading &&
                <div className='container'>
                    <div className="leftSide">
                        <img src={ImagemLogin} alt="" />
                        <a href='https://www.freepik.com/vectors/invoice'>Invoice vector created by storyset - www.freepik.com</a>
                    </div>
                    <div className="rightSide">
                        {loginIn &&
                            <SignIn
                                getEmail={handleEmail}
                                getPassword={handlePassword}
                                cadastrar={handleCadastar}
                                singIn={handleAuthLogin}
                            />
                        }
                        {!loginIn &&
                            <SignUp
                                getEmail={handleEmail}
                                getPassword={handlePassword}
                                getName={handleName}
                                entrar={handleLoginArea}
                                singUp={handleAuthCadastro}
                            />
                        }
                    </div>
                </div>
            }
        </C.Container>
    )
}
