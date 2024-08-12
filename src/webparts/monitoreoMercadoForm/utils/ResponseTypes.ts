import { Activo } from "../enums/Activo";

export interface UnidadesResponse {
    value: UnidadesResponseValue[];
}

export interface UnidadesResponseValue {
    Id:    number;
    Title: string;
    ID:    number;
}

export interface ClientesResponse {
    value: ClientesResponseValue[];
}

export interface ClientesResponseValue {
    Id:                           number;
    Title:                        string;
    Codigo_x0020_SAP:             number;
    UnidadId:                     number;
    Codigo_x0020_SAP_x0020_CNGId: number;
    ID:                           number;
}

export interface FamiliaProductosResponse {
    value: FamiliaProductosResponseValue[];
}

export interface FamiliaProductosResponseValue {
    Id:                 number;
    Title:              string;
    UnidaddeMedida:     string;
    Activo:             Activo;
    PeriododeCultivoId: number;
    ID:                 number;
}

export interface PeriodosCultivoResponse {
    value: PeriodosCultivoResponseValue[];
}

export interface PeriodosCultivoResponseValue {
    Id:    number;
    Title: string;
    ID:    number;
}

export interface CNGResponse {
    value: CNGResponseValue[];
}

export interface CNGResponseValue {
    Id:        number;
    Title:     string;
    Correo:    string;
    NombreCNG: string;
    ID:        number;
}

export interface ProveedoresResponse {
    value: ProveedoresResponseValue[];
}

export interface ProveedoresResponseValue {
    Id:                               number;
    Title:                            string;
    Familia_x0020_de_x0020_ProductoId: number;
    ID:                               number;
}



