import { BusinessBranch } from '@models/BusinessBranch';

export interface IBusinessBranchService {
	getAll(): Promise<BusinessBranch[]>;
	getById(id: number): Promise<BusinessBranch>;
	getPaged(
		pageSize: number,
		requestedPage: number,
	): Promise<{ businessBranchsPage: BusinessBranch[]; count: number }>;
	create(businessBranch: BusinessBranch): Promise<boolean>;
	update(businessBranch: BusinessBranch): Promise<boolean>;
	delete(businessBranch: BusinessBranch): Promise<boolean>;
}
