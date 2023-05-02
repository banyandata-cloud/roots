export class TableChip {
	constructor({
		key = '',
		icon = null,
		label = '',
		labelSearch = false,
		value = '',
		valueSearch = false,
		disabled = false,
		rightComponent = null,
		autocompleteOptions = {},
	}) {
		this.key = key;
		this.icon = icon;
		this.label = label;
		this.labelSearch = labelSearch;
		this.value = value;
		this.valueSearch = valueSearch;
		this.disabled = disabled;
		this.rightComponent = rightComponent;
		this.autocompleteOptions = autocompleteOptions;
	}
}
