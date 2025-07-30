/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
interface HueRange {
	min: number; // 0-360
	max: number; // 0-360
}

interface GenerateColorsOptions {
	count?: number;
	excludedColors?: string[]; // HEX strings
	exclusionThreshold?: number; // 0-441.67 (max color distance)
	distinctionThreshold?: number; // 0-441.67
	excludedHueRanges?: HueRange[];
}

export const generateColors = ({
	count = 1,
	excludedColors = [],
	exclusionThreshold = 30,
	distinctionThreshold = 40,
	excludedHueRanges = [],
}: GenerateColorsOptions): string[] => {
	const colors: string[] = [];

	const minLightness = 30;
	const maxLightness = 70;

	const minSaturation = 65;
	const maxSaturation = 100;

	const normalizedExcludedColors = excludedColors.map((color) => {
		return color.startsWith('#') ? color : `#${color}`;
	});

	const hexToRGB = (hex: string): [number, number, number] => {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return [r, g, b];
	};

	const hexToHSL = (hex: string): [number, number, number] => {
		const [rRaw, gRaw, bRaw] = hexToRGB(hex);
		const r = rRaw / 255;
		const g = gRaw / 255;
		const b = bRaw / 255;

		const cmin = Math.min(r, g, b);
		const cmax = Math.max(r, g, b);
		const delta = cmax - cmin;

		let h = 0;
		let s = 0;
		const l = (cmax + cmin) / 2;

		if (delta !== 0) {
			if (cmax === r) {
				h = ((g - b) / delta) % 6;
			} else if (cmax === g) {
				h = (b - r) / delta + 2;
			} else {
				h = (r - g) / delta + 4;
			}

			h = Math.round(h * 60);
			if (h < 0) h += 360;

			s = delta / (1 - Math.abs(2 * l - 1));
		}

		return [h, Math.round(s * 100), Math.round(l * 100)];
	};

	const colorDistance = (hex1: string, hex2: string): number => {
		const [r1, g1, b1] = hexToRGB(hex1);
		const [r2, g2, b2] = hexToRGB(hex2);

		const rMean = (r1 + r2) / 2;
		const r = r1 - r2;
		const g = g1 - g2;
		const b = b1 - b2;

		const weightR = 2 + rMean / 256;
		const weightG = 4.0;
		const weightB = 2 + (255 - rMean) / 256;

		return Math.sqrt(weightR * r * r + weightG * g * g + weightB * b * b);
	};

	const hslToHex = (h: number, s: number, l: number): string => {
		h = ((h % 360) + 360) % 360;
		s = Math.max(0, Math.min(100, s));
		l = Math.max(0, Math.min(100, l));

		l /= 100;
		const a = (s * Math.min(l, 1 - l)) / 100;

		const f = (n: number): string => {
			const k = (n + h / 30) % 12;
			const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * color)
				.toString(16)
				.padStart(2, '0');
		};

		return `#${f(0)}${f(8)}${f(4)}`;
	};

	const isHueExcluded = (hue: number): boolean => {
		return excludedHueRanges.some((range) => {
			if (range.min > range.max) {
				return hue >= range.min || hue <= range.max;
			}
			return hue >= range.min && hue <= range.max;
		});
	};

	const isTooSimilarToExcluded = (hexColor: string): boolean => {
		const [hue] = hexToHSL(hexColor);
		if (isHueExcluded(hue)) {
			return true;
		}

		for (const excludedColor of normalizedExcludedColors) {
			if (colorDistance(hexColor, excludedColor) < exclusionThreshold) {
				return true;
			}
		}

		return false;
	};

	const generateDistinctColor = (): string => {
		let attempts = 0;
		const maxAttempts = 300;

		while (attempts < maxAttempts) {
			const h = Math.floor(Math.random() * 360);
			const s = Math.floor(Math.random() * (maxSaturation - minSaturation)) + minSaturation;
			const l = Math.floor(Math.random() * (maxLightness - minLightness)) + minLightness;

			if (isHueExcluded(h)) {
				attempts++;
				continue;
			}

			const hexColor = hslToHex(h, s, l);

			if (isTooSimilarToExcluded(hexColor)) {
				attempts++;
				continue;
			}

			let isDistinct = true;
			for (const existingColor of colors) {
				if (colorDistance(hexColor, existingColor) < distinctionThreshold) {
					isDistinct = false;
					break;
				}
			}

			if (isDistinct || attempts >= maxAttempts - 1) {
				return hexColor;
			}

			attempts++;
		}

		return hslToHex(Math.floor(Math.random() * 360), 80, 50);
	};

	let failsafeCounter = 0;
	const maxFailsafe = count * 3;

	while (colors.length < count && failsafeCounter < maxFailsafe) {
		const newColor = generateDistinctColor();
		colors.push(newColor);
		failsafeCounter++;
	}

	return colors;
};

export * from './arrayUtils';
export * from './dateUtils';
export * from './inputProps';
export * from './objectUtils';
export * from './stringUtils';
