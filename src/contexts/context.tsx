import { createContext, ReactNode, useReducer } from "react";
import { TerrenoinitialStateType, terrenoInitialState, reducerTerreno } from '../reducers/TerrenoReducer'
import { EdificadainitialStateType, edificadaInitialState, reducerEdificada } from '../reducers/EdificadaReducer'
import { ActionType } from '../types/reducersTypes'
type initialStateType = {
    terreno: TerrenoinitialStateType;
    edificada: EdificadainitialStateType
};

type ContextType = {
    state: initialStateType;
    dispatch: (action: ActionType) => void;
};

const initialState = {
    terreno: terrenoInitialState,
    edificada: edificadaInitialState
};

export const Context = createContext<ContextType>({
    state: initialState,
    dispatch: (action: ActionType) => null
});

const mainReducer = (state: initialStateType, action: ActionType) => ({
    terreno: reducerTerreno(state.terreno, action),
    edificada: reducerEdificada(state.edificada, action)
})

type ProviderType = {
    children: ReactNode;
};

export const ContextProvider = ({ children }: ProviderType) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    const value = { state, dispatch };
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
};

