import * as C from './style'
import { useEffect } from 'react'
import { AddUserType } from '../../Api';
import { useNavigate } from 'react-router-dom';

type Props = {
  user: AddUserType;
}

export const Users = ({ user }: Props) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (user.cargo === 'admin') {
      handleBtn()
    } else {
      navigate('/home')
    }
  }, [])
  const handleBtn = () => {
    let items: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.aside__nav a')
    items.forEach((item) => {
      item.style.color = '#c0c0c0'
    })
    items[2].style.color = '#7C4DFF'
  }
  return (
    <C.Container>
      <h1>Usuários</h1>

    </C.Container>
  )
}