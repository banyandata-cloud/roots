export const getSpacedDisplayName = (input: string | undefined | null): string => {
	if (!input) {
		return '';
	}

	const sanitized = input
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/[-_]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

	const words = sanitized.split(' ').map((word) => {
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

export const doubleDigitted = (number: number): string => {
	if (!number) {
		return '';
	}

	return number.toString().slice(-2).padStart(2, '0');
};
