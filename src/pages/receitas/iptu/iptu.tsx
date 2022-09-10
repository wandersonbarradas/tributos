import * as C from './style'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Api from '../../../Api';
import { AddUserType } from '../../../Api'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TerrenoType } from '../../../types/terreno';
import { TableIptu } from '../../../components/tableIptu/tableIptu';
import { Context } from '../../../contexts/context'
import { Validador } from '../../../helpers/validador'
import { formatNumber } from '../../../helpers/formatRS'
import { CadIptuType } from '../../../types/cadIptu';
import { Loading } from '../../../components/loading/Loading'
import { IptuType } from '../../../types/iptu';
import iptuFunction, { initialIptu } from '../../../calculos/calculos';

type Props = {
    user: AddUserType | null;
}

export const Iptu = ({ user }: Props) => {
    const [active, setActive] = useState('terreno')
    const [cadIptu, setCadIptu] = useState<CadIptuType | null>(null)
    const [loading, setLoading] = useState(false)
    const [calculado, setCalculado] = useState(false)
    const [opacity, setOpacity] = useState(false)
    const { state } = useContext(Context)
    const [calcIptu, setCalcIptu] = useState<IptuType>(initialIptu)

    useEffect(() => {
        handleBtn()
    }, [])

    useEffect(() => {
        getCadIptu()
    }, [user])

    useEffect(() => {
        if (cadIptu?.terreno) {
            setLoading(false)
        }
    }, [cadIptu])

    const handleBtn = () => {
        let items: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.aside__nav a')
        items.forEach((item) => {
            item.style.color = '#c0c0c0'
        })
        items[1].style.color = '#00C853'
    }

    const handleActive = () => {
        active === 'terreno' ? setActive('edificada') : setActive('terreno')
    }

    const ordem = (cadIp: CadIptuType, data: string) => {
        let newCadIptu = { ...cadIp }
        let terreno: TerrenoType[] = []
        if (data === 'terreno') {
            terreno = newCadIptu.terreno
        } else {
            terreno = newCadIptu.edificada
        }
        let org: TerrenoType[] = []
        for (let i in terreno) {
            if (terreno[i].info.input) {
                org.unshift(terreno[i])
            } else {
                org.push(terreno[i])
            }
        }
        if (data === 'terreno') {
            newCadIptu.terreno = org
        } else {
            newCadIptu.edificada = org
        }
        return newCadIptu
    }

    const getCadIptu = async () => {
        setLoading(true)
        if (user && user.cadIptu) {
            let data = await Api.getDocUser('iptus', user.cadIptu) as CadIptuType | null
            if (data !== null) {
                data = ordem(data, 'terreno')
                data = ordem(data, 'edificada')
                setCadIptu(data)
            }
        }
    }

    const handleCalc = () => {
        let tableTerreno = document.querySelector('#TableTerreno') as HTMLTableElement
        let validateTerreno = Validador.verificar(tableTerreno);
        if (validateTerreno) {
            switch (state.terreno.utilizacao) {
                case 1:
                    if (state.terreno.ocupacao === 1) {
                        let tableEdificada = document.querySelector('#TableEdificada') as HTMLTableElement
                        let validateEdificada = Validador.verificar(tableEdificada)
                        if (validateEdificada) {
                            setCalcIptu(iptuFunction.calcGeral(state.terreno, state.edificada, cadIptu))
                            handleModal()
                        } else {
                            setActive('edificada')
                        }
                    } else {
                        alert('Para utilização "residencial" a ocupação deve ser "contruído"')
                    }
                    break
                case 2:
                    if (state.terreno.ocupacao === 1) {
                        let tableEdificada = document.querySelector('#TableEdificada') as HTMLTableElement
                        let validateEdificada = Validador.verificar(tableEdificada)
                        if (validateEdificada) {
                            setCalcIptu(iptuFunction.calcGeral(state.terreno, state.edificada, cadIptu))
                            handleModal()
                        } else {
                            setActive('edificada')
                        }
                    } else {
                        setCalcIptu(iptuFunction.calcGeral(state.terreno, state.edificada, cadIptu))
                        handleModal()
                    }
                    break
                case 3:
                    if (state.terreno.ocupacao === 1) {
                        alert('Para utilização "terreno" a ocupação deve ser "não contruído"')
                    } else {
                        setCalcIptu(iptuFunction.calcGeral(state.terreno, state.edificada, cadIptu))
                        handleModal()
                    }
                    break
                default:
            }
        } else {
            setActive('terreno')
        }
    }

    const handleModal = () => {
        if (calculado) {
            setOpacity(false)
            setTimeout(() => {
                setCalculado(false)
            }, 500)
        } else {
            setCalculado(true)
            setTimeout(() => {
                setOpacity(true)
            }, 500)
        }
    }

    const CalcVenal = (terreno: number | undefined, edificada: number | undefined) => {
        if (edificada !== undefined && terreno !== undefined) {
            return formatNumber((terreno + edificada).toFixed(2))
        } else if (terreno !== undefined) {
            return formatNumber(terreno.toFixed(2))
        }
    }

    return (
        <C.Container active={active} modal={opacity}>
            <div className='receita_title'>
                <Link to={'/receitas'}>
                    <ArrowBackIcon fontSize='large' />
                </Link>
                <h1>IPTU</h1>
            </div>
            <div className='main_iptu'>
                <div className='iptu_options'>
                    <div className='options'>
                        <div onClick={handleActive} className='option option_terreno'>Terreno</div>
                        <div onClick={handleActive} className='option option_edificada'>Edificada</div>
                    </div>
                    <div className='btn_area'>
                        <button onClick={handleCalc}>Calcular</button>
                    </div>
                </div>

                <div className='iptu_calc_area'>
                    {loading &&
                        <Loading />
                    }

                    {!loading &&
                        <>
                            <div style={active === 'terreno' ? { display: 'block' } : { display: 'none' }} className='calc_iptu'>
                                <TableIptu
                                    data={cadIptu?.terreno}
                                    id={'TableTerreno'}
                                />
                            </div>

                            <div style={active === 'edificada' ? { display: 'block' } : { display: 'none' }} className='calc_iptu'>
                                <TableIptu
                                    data={cadIptu?.edificada}
                                    id={'TableEdificada'}
                                />
                            </div>
                        </>
                    }
                </div>
            </div>
            {calculado &&
                <div className='modalCal'>
                    <div className='content'>
                        <div className='header'>
                            <h2>Relatório do cálculo</h2>
                            <span onClick={handleModal}>X</span>
                        </div>
                        <div className='box-info'>
                            <div className='tarja'>
                                Dados Territoriais
                            </div>
                            <div className='content-info'>
                                <div className='row rowImovel'>
                                    <div className='col'>
                                        <span>Área do Terreno</span>
                                        <div>{formatNumber((state.terreno.area_terreno).toFixed(2))} m²</div>
                                    </div>
                                    <div className='col'>
                                        <span>Testada</span>
                                        <div>{formatNumber((state.terreno.testada).toFixed(2))} m</div>
                                    </div>
                                    <div className='col'>
                                        <span>Valor do m²</span>
                                        <div>R$ {
                                            formatNumber((calcIptu.valorBaseTerreno).toFixed(2))
                                        }</div>
                                    </div>
                                    <div className='col'>
                                        <span>Fator de Localização</span>
                                        <div>{
                                            formatNumber((calcIptu.fatorLocalizacao).toFixed(2))
                                        }</div>
                                    </div>
                                    <div className='col'>
                                        <span>Valor do Terreno</span>
                                        <div>R$ {
                                            formatNumber((calcIptu.vvt).toFixed(2))
                                        }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='box-info'>
                            <div className='tarja'>
                                Dados da Edificação
                            </div>
                            <div className='content-info'>
                                <div className='row rowImovel'>
                                    <div className='col'>
                                        <span>Tipo da Edificação</span>
                                        <div>{
                                            calcIptu.vve > 0 ? state.edificada.tipoName : 'Sem edificação'
                                        }</div>
                                    </div>
                                    <div className='col'>
                                        <span>Área da Edificação</span>
                                        <div>{
                                            calcIptu.vve > 0 ? formatNumber((state.edificada.areaEdificada).toFixed(2)) : '0,00'
                                        } m²</div>
                                    </div>
                                    <div className='col'>
                                        <span>Valor m² Edificação</span>
                                        <div>R$ {
                                            calcIptu.vve > 0 ? formatNumber((state.edificada.tipo).toFixed(2)) : '0,00'
                                        }</div>
                                    </div>
                                    <div className='col'>
                                        <span>Pontos</span>
                                        <div>{
                                            formatNumber((calcIptu.pontos).toFixed(2))
                                        }</div>
                                    </div>
                                    <div className='col'>
                                        <span>Valor da Edificação</span>
                                        <div>R$ {
                                            formatNumber((calcIptu.vve).toFixed(2))
                                        }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='box-info'>
                            <div className='tarja'>
                                Dados Gerais
                            </div>
                            <div className='content-info'>
                                <table className='tableVenal'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>

                                            </th>
                                            <th scope='col'>
                                                <span>Terreno</span>
                                            </th>
                                            <th scope='col'>
                                                <span >Edificação</span>
                                            </th>
                                            <th scope='col'>
                                                <span >Imovel</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className='col'>
                                                <span>V. Venal</span>
                                            </th>
                                            <th className='col'>
                                                <div>R$ {
                                                    formatNumber((calcIptu.vvt).toFixed(2))
                                                }</div>
                                            </th>
                                            <th className='col'>
                                                <div>R$ {
                                                    formatNumber((calcIptu.vve).toFixed(2))
                                                }</div>
                                            </th>
                                            <th className='col'>
                                                <div>R$ {
                                                    CalcVenal(calcIptu.vvt, calcIptu.vve)
                                                }</div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className='col'>
                                                <span>Aliquotas</span>
                                            </th>
                                            <th className='col'>
                                                <div>
                                                    {formatNumber((calcIptu.aliquota).toFixed(2))} %
                                                </div>
                                            </th>
                                            <th className='col'>
                                                <div>
                                                    {formatNumber((calcIptu.aliquota).toFixed(2))} %
                                                </div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className='tableResultIptu'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>

                                            </th>
                                            <th scope='col'>
                                                <span>IPTU</span>
                                            </th>
                                            <th scope='col'>
                                                <span>TSU</span>
                                            </th>
                                            <th scope='col'>
                                                <span>TOTAL IPTU</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className='col'>
                                                <span>Valor</span>
                                            </th>
                                            <th className='col'>
                                                <div>R$ {
                                                    formatNumber((calcIptu.valorIptu).toFixed(2))
                                                }
                                                </div>
                                            </th>
                                            <th className='col'>
                                                <div>R$ {formatNumber((calcIptu.tsu).toFixed(2))}</div>
                                            </th>
                                            <th className='col'>
                                                <div>R${
                                                    formatNumber((calcIptu.valorIptu + calcIptu.tsu).toFixed(2))
                                                }</div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </C.Container>
    )
}
