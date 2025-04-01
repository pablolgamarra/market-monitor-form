import { BusinessBranch } from '@models/BusinessBranch';

export interface Cng {
	Id: number;
	Name: string;
	SAPCode: string;
	Email: string;
	Role: string;
	BusinessBranch: BusinessBranch;
}
