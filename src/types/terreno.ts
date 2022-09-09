export type TerrenoType = {
    features?: Data[];
    info: Info;
};

export type Data = {
    description: string;
    value: number;
};

export type Info = {
    name: string;
    type: string;
    input: boolean;
    inputType?: string;
    action: string;
    rules: string;
};
