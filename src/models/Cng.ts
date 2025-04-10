import BusinessBranch from '@models/BusinessBranch';

export default interface Cng {
	Id: number;
	Name: string;
	SAPCode: string;
	Email: string;
	Role: string;
	BusinessBranch: BusinessBranch;
}
