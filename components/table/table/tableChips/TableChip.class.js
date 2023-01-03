export class TableChip {
	constructor({
		key = '',
		icon = null,
		label = '',
		value = '',
		disabled = false,
		rightComponent = null,
	}) {
		this.key = key;
		this.icon = icon;
		this.label = label;
		this.value = value;
		this.disabled = disabled;
		this.rightComponent = rightComponent;
	}
}
