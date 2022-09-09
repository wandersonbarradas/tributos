import * as C from './style'
import InicioImg from '../../assets/images/inicioimage.svg'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/home')
        handleBtn()
    }, [navigate])


    const handleBtn = () => {
        let items: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.aside__nav a')
        items.forEach((item) => {
            item.style.color = '#c0c0c0'
        })
        items[0].style.color = '#f57c00'
    }

    return (
        <C.Container>
            <h1>Início</h1>
            <div className='inicio_main'>
                <div className='inicio_info'>
                    <h2><span>Seja bem vindo</span> a
                        plataforma de cálculos
                        de receitas Municipais.
                    </h2>
                    <p>Essa plataforma foi projetada para te ajudar no seu dia a dia. Intuitiva e muito simples de ser usada ela vai te ajudar bastante nos seus calculos tributários.</p>
                    <Link to={'/receitas'} >
                        Comece agora mesmo
                    </Link>
                </div>
                <div className='inicio_image'>
                    <img src={InicioImg} alt="" />
                </div>
            </div>
        </C.Container>
    )
}