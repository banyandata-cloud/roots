export class TableChip {
	constructor({
		key = '',
		icon = null,
		label = '',
		labelId = null,
		labelSearch = false,
		value = '',
		valueSearch = false,
		disabled = false,
		rightComponent = null,
		autocompleteOptions = {},
		temp = false,
	}) {
		this.key = key;
		this.icon = icon;
		this.label = label;
		this.labelId = labelId;
		this.labelSearch = labelSearch;
		this.value = value;
		this.valueSearch = valueSearch;
		this.disabled = disabled;
		this.rightComponent = rightComponent;
		this.autocompleteOptions = autocompleteOptions;
		this.temp = temp;
	}
}
