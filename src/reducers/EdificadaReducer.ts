import { ActionType } from "../types/reducersTypes";

export type EdificadainitialStateType = {
    cobertura: number;
    areaEdificada: number;
    estrutura: number;
    revestimento: number;
    piso: number;
    sanitaria: number;
    posicao: number;
    conservacao: number;
    tipo: number;
    tipoName: string;
    forro: number;
    eletrica: number;
};

export const edificadaInitialState: EdificadainitialStateType = {
    cobertura: 0,
    areaEdificada: 0,
    estrutura: 0,
    revestimento: 0,
    piso: 0,
    sanitaria: 0,
    posicao: 0,
    conservacao: 0,
    tipo: 0,
    tipoName: "",
    forro: 0,
    eletrica: 0,
};

export const reducerEdificada = (
    state: EdificadainitialStateType,
    action: ActionType,
) => {
    switch (action.type) {
        case "setCobertura":
            return { ...state, cobertura: action.payload };
        case "setAreaEdificada":
            return { ...state, areaEdificada: action.payload };
        case "setEstrutura":
            return { ...state, estrutura: action.payload };
        case "setRevestimento":
            return { ...state, revestimento: action.payload };
        case "setPiso":
            return { ...state, piso: action.payload };
        case "SetSanitaria":
            return { ...state, sanitaria: action.payload };
        case "setPosicao":
            return { ...state, posicao: action.payload };
        case "setConservacao":
            return { ...state, conservacao: action.payload };
        case "setTipoEdificada":
            return { ...state, tipo: action.payload };
        case "setForro":
            return { ...state, forro: action.payload };
        case "setEletrica":
            return { ...state, eletrica: action.payload };
        case "setTipoName":
            return { ...state, tipoName: action.payload };
        default:
            return state;
    }
};
