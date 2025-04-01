import { PaymentCondition } from '@common/PaymentCondition';

export interface MarketInformationResponse {
	Id: number;
	ClienteId: number;
	Familia_x0020_de_x0020_ProductoId: number;
	VolumenYaComprado: string;
	Precio: number;
	Condici_x00f3_nPago: PaymentCondition;
	Proveedor_x0020_PrincipalId: number;
	Periodo_x0020_de_x0020_CultivoId: number;
	CNGId: number | undefined;
	ID: number;
}
