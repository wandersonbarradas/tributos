import * as C from './style'
import { useContext } from 'react'
import { TerrenoType } from '../../types/terreno'
import { InputIptu } from '../inputIptu/inputIptu'
import { Context } from '../../contexts/context'

type Props = {
    data?: TerrenoType[];
    id: string
}
export const TableIptu = ({ data, id }: Props) => {
    const { dispatch } = useContext(Context)

    const getValue = (value: string | number, action: string) => {
        dispatch({
            type: action,
            payload: value
        })
    }
    return (
        <C.Table id={id}>
            <thead>
                <tr>
                    <th scope='col'>
                        <span className='terreno_tipo'>Tipo</span>
                    </th>
                    <th scope='col'>
                        <span className='terreno_carac'>Categoria</span>
                    </th>
                    <th scope='col'>
                        <span className='terreno_desc'>Caracteristica</span>
                    </th>
                    <th scope='col'>
                        <span className='valor'>Valor</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => (
                    <tr key={index}>
                        <InputIptu data={item} getData={getValue} />
                    </tr>
                ))}
            </tbody>
        </C.Table>
    )
}