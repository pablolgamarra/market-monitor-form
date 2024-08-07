export interface InformacionMercadoRequest{
  value?: InformacionMercadoValue;
}
export interface InformacionMercadoValue {
  Id?:                                number;
  OData__ColorTag?:                   undefined;
  ComplianceAssetId?:                 undefined;
  VolumenYaComprado:                 string;
  Condici_x00f3_nPago:               string;
  Precio:                            number;
  ClienteId:                         number;
  Familia_x0020_de_x0020_ProductoId: number;
  Proveedor_x0020_PrincipalId:       number;
  Periodo_x0020_de_x0020_CultivoId:  number;
  ID?:                                number;
  Modified?:                          Date;
  Created?:                           Date;
  AuthorId?:                          number;
  EditorId?:                          number;
  OData__UIVersionString?:            string;
  Attachments?:                       boolean;
  GUID?:                              string;
}