export const getSpacedDisplayName = (input = '') => {
	if (!input) return '';

	// 1) trim
	let str = input.trim();

	// 2) remove leading "_" or "-" (bounded, not greedy)
	str = str.replace(/^[_-]+/, '');

	// 3) normalize "_" and "-" to space
	// simple character class, global, safe
	str = str.replace(/[_-]+/g, ' ');

	// 4) camelCase: fooBar -> foo Bar
	str = str.replace(/([a-z])([A-Z])/g, '$1 $2');

	// 5) acronym-to-word: APIResponse -> API Response
	// (ALLCAPS)(Cap+lower) -> split
	str = str.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

	// 6) collapse multiple spaces (in case we had "_-")
	str = str.replace(/\s+/g, ' ').trim();

	// 7) smart-capitalize: keep ALLCAPS as-is, title-case others
	const words = str.split(' ').map((word) => {
		// preserve abbreviations like API, DB, GPT
		if (/^[A-Z]{2,}$/.test(word)) {
			return word;
		}
		// normal word → Capitalize
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});

	return words.join(' ');
};

export const getInitialsOfName = (name: string): string => {
	const names = name.trim().split(' ').filter(Boolean);

	if (names.length === 0) {
		return '';
	}

	const firstInitial = names[0]?.charAt(0).toUpperCase() ?? '';

	const lastInitial =
		names.length > 1 ? (names[names.length - 1]?.charAt(0).toUpperCase() ?? '') : '';

	return firstInitial + lastInitial;
};

export function classes(...args: (string | false | null | undefined)[]): string {
	return args.filter(Boolean).join(' ');
}

export const isEmptyHtmlString = (htmlString: string): boolean => {
	const textContent = htmlString.replace(/<[^>]*>/g, '');
	return textContent.trim() === '';
};

export const getCSSVariableValue = (variable: `--${string}`): string => {
	return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};

export const doubleDigitted = (number?: number): string => {
	if (number === undefined) {
		return '';
	}
	return number.toString().padStart(2, '0');
};
