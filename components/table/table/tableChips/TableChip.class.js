export class TableChip {
	constructor({ key = '', icon = null, label = '', value = '', disabled = false }) {
		this.key = key;
		this.icon = icon;
		this.label = label;
		this.value = value;
		this.disabled = disabled;
	}
}
