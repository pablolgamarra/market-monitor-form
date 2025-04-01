import { Status } from '@common/Status';

export interface ProductFamilyResponse {
	Id: number;
	Title: string;
	UnidaddeMedida: string;
	Activo: Status;
	PeriododeCultivoId: number[];
	ID: number;
}
