import { ActionType } from "../types/reducersTypes";

export type TerrenoinitialStateType = {
    testada: number;
    coleta_lixo: string;
    area_terreno: number;
    limpeza_publica: string;
    situacao: number;
    topografia: number;
    setor: number;
    utilizacao: number;
    pedologia: number;
    calcamento: string;
    ocupacao: number;
};

export const terrenoInitialState: TerrenoinitialStateType = {
    testada: 0,
    coleta_lixo: "",
    area_terreno: 0,
    limpeza_publica: "",
    situacao: 0,
    topografia: 0,
    setor: 0,
    utilizacao: 0,
    pedologia: 0,
    calcamento: "",
    ocupacao: 0,
};

export const reducerTerreno = (
    state: TerrenoinitialStateType,
    action: ActionType,
) => {
    switch (action.type) {
        case "setTestada":
            return { ...state, testada: action.payload };
        case "setColeta":
            return { ...state, coleta_lixo: action.payload };
        case "setAreaTerreno":
            return { ...state, area_terreno: action.payload };
        case "setLimpeza":
            return { ...state, limpeza_publica: action.payload };
        case "setSituacao":
            return { ...state, situacao: action.payload };
        case "setTopografia":
            return { ...state, topografia: action.payload };
        case "setSetor":
            return { ...state, setor: action.payload };
        case "setUtilizacao":
            return { ...state, utilizacao: action.payload };
        case "setPedologia":
            return { ...state, pedologia: action.payload };
        case "setCalcamento":
            return { ...state, calcamento: action.payload };
        case "setOcupacao":
            return { ...state, ocupacao: action.payload };
        default:
            return state;
    }
};
