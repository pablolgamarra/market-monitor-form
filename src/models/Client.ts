import BusinessBranch from '@models/BusinessBranch';
import Cng from '@models/Cng';

export default interface Client {
	Id: number;
	Name: string;
	SAPCode: number;
	BusinessBranch: BusinessBranch;
	AssignedCng: Cng;
	Year: string;
}
