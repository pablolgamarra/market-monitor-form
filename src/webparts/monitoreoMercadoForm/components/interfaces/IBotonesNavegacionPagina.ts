interface IFuncionBtn {
    (e:Event): void;
}

export interface IBotonesNavegacionPagina {
    index: number;
    max: number;
    retroceder: IFuncionBtn;
    avanzar: IFuncionBtn;
}