import * as C from './style'
import { useEffect, useState } from 'react'
import { ReceitaItem } from '../../components/receitaItem/receitaItem';
import { InfoReceitaType } from '../../types/receitas';
import { Loading } from '../../components/loading/Loading';
import Api from '../../Api'

export const Receitas = () => {
  const [receitas, setReceitas] = useState<InfoReceitaType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleBtn()
    handleReceitas()
  }, [])

  useEffect(() => {
    if (receitas.length > 0) {
      setLoading(false)
    }
  }, [receitas])

  const handleReceitas = async () => {
    setLoading(true)
    let data = await Api.getReceitas() as InfoReceitaType[];
    setReceitas(data)
  }

  const handleBtn = () => {
    let items: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.aside__nav a')
    items.forEach((item) => {
      item.style.color = '#c0c0c0'
    })
    items[1].style.color = '#00C853'
  }

  return (
    <C.Container>
      <h1>Receitas</h1>
      {loading &&
        <div className='loading'>
          <Loading />
        </div>
      }
      {!loading &&
        <ul className='main_receitas'>
          {receitas.map((item, index) => (
            <li key={index}>
              <ReceitaItem
                data={item}
              />
            </li>
          ))}
        </ul>
      }
    </C.Container>
  )
}