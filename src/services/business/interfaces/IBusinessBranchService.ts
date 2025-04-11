import BusinessBranch from '@models/BusinessBranch';

export default interface IBusinessBranchService {
	configure(listName: string): void;
	getAll(): Promise<BusinessBranch[]>;
	getById(id: number): Promise<BusinessBranch>;
	getPaged(
		pageSize: number,
		requestedPage: number,
	): Promise<{ businessBranchsPage: BusinessBranch[]; count: number }>;
	createItem(businessBranch: BusinessBranch): Promise<boolean>;
	updateItem(businessBranch: BusinessBranch): Promise<boolean>;
	deleteItem(businessBranch: BusinessBranch): Promise<boolean>;
}
