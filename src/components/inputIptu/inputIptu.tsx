import './style.css'
import { TerrenoType } from '../../types/terreno';
import { useState, ChangeEvent, MouseEvent } from 'react';

type Props = {
    data: TerrenoType;
    getData: (value: string | number, action: string) => void;
}

export const InputIptu = ({ data, getData }: Props) => {

    const [value, setValue] = useState<number | string>(0)

    const handleValue = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        let element = e.target
        if (data.info.name === 'Tem coleta de lixo' || data.info.name === 'Tem limpeza pública' || data.info.name === 'Tem Calçamento') {
            if (element.value !== 'Selecione') {
                setValue(element.value)
                getData(element.value, data.info.action)
            }
        } else {
            if (data.info.name === "Tipo de edificação") {
                let elementValue = element.value.split('|')
                setValue(+elementValue[0])
                getData(+elementValue[0], data.info.action)
                getData(elementValue[1], 'setTipoName')
            } else {
                let elementValue = Number(element.value)
                if (elementValue >= 0) {
                    setValue(elementValue)
                    getData(elementValue, data.info.action)
                }
            }
        }
    }

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        let element = e.currentTarget;
        let erroElement = element.querySelector('.erro');
        erroElement?.remove()
    }

    return (
        <>
            {data.features &&
                <>
                    <th scope='col'>
                        {data.info.type}
                    </th>
                    <th scope='col'>
                        {data.info.name}
                    </th>
                    <th className='col_input' scope='col' onClick={handleClick}>
                        <select data-rules={data.info.rules} defaultValue={'Selecione'} onChange={handleValue}>
                            <>
                                <option disabled>Selecione</option>
                                {data.features.map((item, index) => (
                                    data.info.name === "Tipo de edificação"
                                        ? <option key={index} value={`${item.value}|${item.description}`}>{item.description}</option> :
                                        <option key={index} value={item.value}>{item.description}</option>
                                ))}
                            </>
                        </select>
                    </th>
                    <th scope='col'>
                        {value}
                    </th>
                </>
            }
            {
                !data.features &&
                <>
                    <th scope='col'>
                        {data.info.type}
                    </th>
                    <th scope='col'>
                        {data.info.name}
                    </th>
                    <th className='col_input' scope='col' onClick={handleClick}>
                        <input data-rules={data.info.rules} onChange={handleValue} type={data.info.inputType} placeholder='Ex: 100' />
                    </th>
                    <th scope='col'>
                        {value}m²
                    </th>
                </>
            }
        </>
    )
}