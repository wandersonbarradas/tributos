import * as C from './style'
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link } from 'react-router-dom';
import { InfoReceitaType } from '../../types/receitas'
type Props = {
    data: InfoReceitaType;
}

export const ReceitaItem = ({ data }: Props) => {
    return (
        <C.Container>
            <div className='receita_title'>
                <div className='receita_icon'>
                    <CalculateIcon />
                </div>
                <span>{data.name}</span>
            </div>
            <Link to={data.url} className='receita_button'>
                Calcular receita
            </Link>
        </C.Container>
    )
}