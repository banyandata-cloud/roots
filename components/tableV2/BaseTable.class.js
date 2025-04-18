const SIZE_MAP = {
	sm: 9.063,
	md: 15.625,
	lg: 21.875,
};

export class TableColumnV2 {
	constructor({
		title = '',
		id = '',
		fallbackValue = '',
		sort = false,
		size = 'md',
		flexible = false,
		style = {},
		multiLine = false,
		sticky = null,
		columnFilter = false,
		html = false,
		json = false,
	}) {
		this.title = title;
		this.id = id;
		this.fallbackValue = fallbackValue;
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
		this.columnFilter = columnFilter;
		this.html = html;
		this.json = json;
	}
}
