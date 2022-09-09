import { ChangeEvent, useEffect, useState } from 'react'
import * as C from './styles'

type Props = {
    name: string
    type: string,
    setValue: (e: string) => void
    value: string;
}

export const UserBoxForm = ({ name, type, setValue, value }: Props) => {
    const [content, setContent] = useState('')
    const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        setContent(value)
    }, [value])
    return (
        <C.Container value={content}>
            <input type={type} name="" value={content} onChange={handleValue} autoComplete="on" required />
            <label>{name}</label>
        </C.Container>
    )
}