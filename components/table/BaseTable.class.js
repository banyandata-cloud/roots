const SIZE_MAP = {
	sm: 9.063,
	md: 15.625,
	lg: 21.875,
};

export class TableColumn {
	constructor({
		title = '',
		id = '',
		sort = false,
		size = 'md',
		flexible = false,
		style = {},
		multiLine = false,
		sticky = null,
	}) {
		this.title = title;
		this.id = id;
		this.sort = sort;
		this.size = size;
		this.sizeInRem = SIZE_MAP[size];
		if (flexible === 'true' || flexible === true) {
			this.flexible = true;
		} else {
			this.flexible = false;
		}
		this.style = style;
		this.multiLine = multiLine;
		this.sticky = sticky;
	}
}
