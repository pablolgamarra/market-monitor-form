export interface UnidadesResponse extends JSON {
  '@odata.context': string,
  value: UnidadesResponseValue[],
}

export interface UnidadesResponseValue {
  '@odata.type': string,
  '@odata.id': string,
  '@odata.etag': string,
  '@odata.editLink': string,
  Id: number,
  Title: string,
  ID: number,
}

export interface ClientesResponse {
  '@odata.context': string,
  value: (ClientesResponseValue)[],
}
export interface ClientesResponseValue {
  '@odata.type': string,
  '@odata.id': string,
  '@odata.etag': string,
  '@odata.editLink': string,
  Id: number,
  Title: string,
  RUC_x002f_CI: number,
  UnidadId: number,
  Nombre_x0020_CNG: string
  ID: number,
}

export interface FamiliaProductosResponse {
  '@odata.context': string,
  value: (FamiliaProductosResponseValue)[],
}

export interface FamiliaProductosResponseValue {
  '@odata.type': string,
  '@odata.id': string,
  '@odata.etag': string,
  '@odata.editLink': string,
  Id: number,
  Title: string,
  UnidaddeMedida: string,
  ID: number,
}
