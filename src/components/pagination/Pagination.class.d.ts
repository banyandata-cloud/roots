export interface Page {
	number: number;
	ellipsis?: boolean;
}

export interface PaginationListInit {
	curr: number;
	total: number;
}

export declare class PaginationList {
	pages: Page[];

	constructor(init: PaginationListInit);
}
