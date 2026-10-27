import type { ChangeEvent } from 'react';

/** Joins the truthy class names. */
export function classes(...args: (string | false | null | undefined)[]): string {
	return args.filter(Boolean).join(' ');
}

/** Reads the name, value and dataset of a form control change event. */
export function inputHelper(
	event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
): {
	fieldName: string;
	fieldValue: string | boolean;
	dataset: DOMStringMap;
} {
	const { name, value, dataset, type } = event.target;

	let fieldValue: string | boolean = value;

	if (event.target instanceof HTMLInputElement && ['checkbox', 'radio'].includes(type)) {
		fieldValue = event.target.checked;
	}

	return {
		fieldName: name,
		fieldValue,
		dataset,
	};
}
