import * as C from './style'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import React, { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AddUserType } from '../../Api';

type Props = {
    user: AddUserType
}


export const Aside = ({ user }: Props) => {
    const [menuOpen, setMenuOpen] = useState(true)

    const handleBtn = (e: React.MouseEvent<HTMLElement>) => {
        let aItem = e.currentTarget.querySelector('a')
        let items: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.aside__nav a')
        items.forEach((item) => {
            item.style.color = '#c0c0c0'
        })
        switch (aItem) {
            case items[0]:
                aItem.style.color = '#F57C00'
                break;
            case items[1]:
                aItem.style.color = '#00C853'
                break;
            case items[2]:
                aItem.style.color = '#7C4DFF'
                break;
        }
    }
    const handleMobile = () => {
        menuOpen ? setMenuOpen(false) : setMenuOpen(true)
    }
    return (
        <C.Container toggle={menuOpen}>
            <button onClick={handleMobile} className='toogle-aside'>
                <ArrowForwardIosIcon />
            </button>
            <div className='aside'>
                <div className='aside__logo'>
                    {menuOpen &&
                        <>
                            Tributos
                            <br />
                            <span>by Wanderson</span>
                        </>
                    }
                    {!menuOpen &&
                        <>
                            <span className='logo_menu'>T</span>
                        </>
                    }
                </div>
                <div className='aside__nav'>
                    <ul>
                        <li onClick={handleBtn}>
                            <Link to={'/home'}>
                                <div className='aside_nav_icon'>
                                    <HomeIcon />
                                </div>
                                Home
                            </Link>
                        </li>
                        <li onClick={handleBtn}>
                            <Link to={'/receitas'}>
                                <div className='aside_nav_icon'>
                                    <AttachMoneyIcon />
                                </div>
                                Receitas
                            </Link>
                        </li>
                        {user.cargo === 'admin' &&
                            <li onClick={handleBtn}>
                                <Link to={'/usuarios'}>
                                    <div className='aside_nav_icon'>
                                        <PeopleAltIcon />
                                    </div>
                                    Usuários
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </C.Container>
    )
}