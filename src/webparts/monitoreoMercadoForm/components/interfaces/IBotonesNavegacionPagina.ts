interface IFuncionBtn {
    (): void;
}

export interface IBotonesNavegacionPagina {
    index: number;
    max: number;
    retroceder: IFuncionBtn;
    avanzar: IFuncionBtn;
}