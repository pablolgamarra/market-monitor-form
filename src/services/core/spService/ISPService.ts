export interface ISPService {
	getAllItems<T = any>(listName: string): Promise<T[]>;
	getItemsFiltered<T = any>(listName: string, filter: string): Promise<T[]>;
	getItemById<T = any>(listName: string, id: number): Promise<T>;
	insertItem<T extends { Id?: number }>(listName: string, item: T): Promise<boolean>;
	updateItem<T extends { Id: number }>(listName: string, item: T): Promise<boolean>;
	deleteItem(listName: string, id: number): Promise<boolean>;
	insertDocument?<T extends { Id: number; file: File }>(libraryName: string, item: T): Promise<boolean>;
	getDocument?: (libraryName: string, fileNameURI: string) => Promise<ArrayBuffer | undefined>;
	getListItemsPaged<T = any>(
		listName: string,
		arg0: number,
		arg1: number,
	): Promise<{ results: T[]; totalCount: number }>;
}
