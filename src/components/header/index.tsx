import * as C from './style'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AddUserType } from '../../Api';
import { useState } from 'react';
import { doLogout } from '../../Api'

type Props = {
    user: AddUserType | null;
    setNewUser: (user: null) => void
}

export const Header = ({ user, setNewUser }: Props) => {
    const [drop, setDrop] = useState(false)

    const handleDrop = () => {
        drop ? setDrop(false) : setDrop(true)
    }

    const exit = () => {
        doLogout()
        setNewUser(null)
    }

    return (
        <C.Container drop={drop}>
            <div className='header_user'>
                <span>{user?.name}</span>
                <div className='header_icon'>
                    <div onClick={handleDrop} className='header_elipse_icon'>
                        <ArrowDropDownIcon fontSize='small' />
                    </div>
                </div>
            </div>
            <div className='menu_drop'>
                <ul>
                    <li onClick={exit}>Sair</li>
                </ul>
            </div>
        </C.Container>
    )
}