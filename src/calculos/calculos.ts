import { TerrenoinitialStateType } from "../reducers/TerrenoReducer";
import { EdificadainitialStateType } from "../reducers/EdificadaReducer";
import { AliquotasType } from "../types/aliquotas";
import { SetoresItem } from "../types/setores";
import { CadIptuType } from "../types/cadIptu";
import { IptuType } from "../types/iptu";

export const initialIptu: IptuType = {
    vvt: 0,
    vve: 0,
    valorBaseTerreno: 0,
    fatorLocalizacao: 0,
    valorIptu: 0,
    aliquota: 0,
    tsu: 0,
    pontos: 0,
};

const iptuFunction = {
    calcGeral: (
        terreno: TerrenoinitialStateType,
        edificada: EdificadainitialStateType,
        cadIptu: CadIptuType | null,
    ) => {
        let iptu: IptuType;
        if (cadIptu) {
            switch (terreno.utilizacao) {
                case 3:
                    iptu = iptuFunction.calcTerreno(terreno, cadIptu);
                    return iptu;
                case 2:
                    iptu = iptuFunction.calcNaoResidencial(
                        terreno,
                        edificada,
                        cadIptu,
                    );
                    return iptu;
                case 1:
                    iptu = iptuFunction.calcResidencial(
                        terreno,
                        edificada,
                        cadIptu,
                    );
                    return iptu;
                default:
                    return initialIptu;
            }
        } else {
            alert("Dados do Imovel não encontrado!");
        }
        return initialIptu;
    },
    calcTerreno: (terreno: TerrenoinitialStateType, cadIptu: CadIptuType) => {
        let iptu = {
            vvt: 0,
            vve: 0,
            valorBaseTerreno: cadIptu.setores[terreno.setor - 1].valorBase,
            fatorLocalizacao: cadIptu.setores[terreno.setor - 1].fatorLoc,
            valorIptu: 0,
            aliquota: 0,
            tsu: 0,
            pontos: 0,
        };
        iptu.vvt = iptuFunction.valorVenalTerreno(terreno, cadIptu.setores);
        let valueIptu = iptuFunction.CalcIptu(
            iptu.vvt,
            cadIptu.aliquotas,
            terreno.utilizacao,
        );
        iptu.valorIptu = valueIptu.iptu;
        iptu.aliquota = valueIptu.aliq;
        iptu.tsu = iptuFunction.calcTsu(terreno.testada);
        return iptu;
    },
    calcNaoResidencial: (
        terreno: TerrenoinitialStateType,
        edificada: EdificadainitialStateType,
        cadIptu: CadIptuType,
    ) => {
        let iptu = {
            vvt: 0,
            vve: 0,
            valorBaseTerreno: cadIptu.setores[terreno.setor - 1].valorBase,
            fatorLocalizacao: cadIptu.setores[terreno.setor - 1].fatorLoc,
            valorIptu: 0,
            aliquota: 0,
            tsu: 0,
            pontos: 0,
        };
        if (terreno.ocupacao === 1) {
            iptu = iptuFunction.calcResidencial(terreno, edificada, cadIptu);
        } else {
            iptu = iptuFunction.calcTerreno(terreno, cadIptu);
        }
        return iptu;
    },
    calcResidencial: (
        terreno: TerrenoinitialStateType,
        edificada: EdificadainitialStateType,
        cadIptu: CadIptuType,
    ) => {
        let iptu = {
            vvt: 0,
            vve: 0,
            valorBaseTerreno: cadIptu.setores[terreno.setor - 1].valorBase,
            fatorLocalizacao: cadIptu.setores[terreno.setor - 1].fatorLoc,
            valorIptu: 0,
            aliquota: 0,
            tsu: 0,
            pontos: 0,
        };
        iptu.vvt = iptuFunction.valorVenalTerreno(terreno, cadIptu.setores);
        let valorEdificada = iptuFunction.valorVenalEdificada(edificada);
        iptu.vve = valorEdificada.vve;
        iptu.pontos = valorEdificada.pontos;
        let valueIptu = iptuFunction.CalcIptu(
            iptu.vvt + iptu.vve,
            cadIptu.aliquotas,
            terreno.utilizacao,
        );
        iptu.valorIptu = valueIptu.iptu;
        iptu.aliquota = valueIptu.aliq;
        iptu.tsu = iptuFunction.calcTsu(
            terreno.testada,
            edificada.areaEdificada,
        );
        return iptu;
    },
    valorVenalTerreno: (
        data: TerrenoinitialStateType,
        setores: SetoresItem[],
    ) => {
        let VVT =
            data.area_terreno *
            setores[data.setor - 1].valorBase *
            (setores[data.setor - 1].fatorLoc / 100) *
            data.situacao *
            data.pedologia *
            data.topografia;
        return VVT;
    },
    valorVenalEdificada: (data: EdificadainitialStateType) => {
        let cat =
            data.revestimento +
            data.piso +
            data.forro +
            data.cobertura +
            data.estrutura +
            data.sanitaria +
            data.eletrica;
        let VVE =
            data.areaEdificada *
            data.tipo *
            (cat / 100) *
            data.posicao *
            data.conservacao;
        return {
            pontos: cat,
            vve: VVE,
        };
    },
    CalcIptu: (
        venal: number,
        aliquotas: AliquotasType | undefined,
        utilizacao: number,
    ) => {
        let aliq = iptuFunction.getAliquota(utilizacao, venal, aliquotas);
        let iptu = venal * (aliq / 100);
        return {
            iptu,
            aliq,
        };
    },
    getAliquota: (
        utilizacao: number,
        valor: number,
        aliquotas: AliquotasType | undefined,
    ): number => {
        if (aliquotas) {
            switch (utilizacao) {
                case 1:
                    if (valor > 50000) {
                        return aliquotas.residencial[2];
                    } else if (valor >= 1000.01 && valor <= 50000.0) {
                        return aliquotas.residencial[1];
                    } else if (valor > 0 && valor <= 1000.0) {
                        return aliquotas.residencial[0];
                    }
                    break;
                case 2:
                    if (valor > 50000) {
                        return aliquotas.naoResidencial[2];
                    } else if (valor >= 1000.01 && valor <= 50000.0) {
                        return aliquotas.naoResidencial[1];
                    } else if (valor > 0 && valor <= 1000.0) {
                        return aliquotas.naoResidencial[0];
                    }
                    break;
                case 3:
                    if (valor > 50000) {
                        return aliquotas.terreno[2];
                    } else if (valor >= 1000.01 && valor <= 50000.0) {
                        return aliquotas.terreno[1];
                    } else if (valor > 0 && valor <= 1000.0) {
                        return aliquotas.terreno[0];
                    }
                    break;
            }
        }
        return 0;
    },
    calcTsu: (testada: number, areaEdificada?: number) => {
        let valorRef = 28;
        let LimpezaPublica = valorRef * testada * 0.005;
        let conservacaoLogradouro = valorRef * testada * 0.005;
        let ilumincaoPublica: number = 0;
        if (areaEdificada !== undefined) {
            ilumincaoPublica = valorRef * areaEdificada * 0.002;
        }
        return LimpezaPublica + conservacaoLogradouro + ilumincaoPublica;
    },
};

export default iptuFunction;
