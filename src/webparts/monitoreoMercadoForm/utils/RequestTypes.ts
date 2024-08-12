import { CondicionesPago } from "../enums/CondicionesPago";

export interface InformacionMercadoRequest{
  value?: InformacionMercadoValue;
}
export interface InformacionMercadoValue {
    Id:                                number;
    ClienteId:                         number;
    Familia_x0020_de_x0020_ProductoId: number;
    VolumenYaComprado:                 string;
    Precio:                            number;
    Condici_x00f3_nPago:               CondicionesPago;
    Proveedor_x0020_PrincipalId:       number;
    Periodo_x0020_de_x0020_CultivoId:  number;
    CNGId:                             undefined;
    ID:                                number;
}