import { Status } from '@common/Status';
import AgroPeriod from '@models/AgroPeriod';

export default interface ProductFamily {
	Id: number;
	Name: string;
	MeasureUnit: string;
	AgroPeriod: AgroPeriod[];
	Status: Status;
}
