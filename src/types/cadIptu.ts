import { TerrenoType } from "./terreno";
import { SetoresType, SetoresItem } from "./setores";
import { AliquotasType } from "./aliquotas";

export type CadIptuType = {
    terreno: TerrenoType[];
    edificada: TerrenoType[];
    setores: SetoresItem[];
    aliquotas: AliquotasType;
};
