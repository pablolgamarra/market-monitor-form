import { Status } from '@common/Status';
import { AgroPeriod } from '@models/AgroPeriod';

export interface ProductFamily {
	Id: number;
	Name: string;
	MeasureUnit: string;
	AgroPeriod: AgroPeriod[];
	Status: Status;
}
