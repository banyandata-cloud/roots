import * as v2 from './index';

// Icons live in icons/ (and each component's assets/) for internal use only; the package does
// not expose them to consuming apps.
describe('v2 public API', () => {
	test('does not export icon components', () => {
		const iconExports = Object.keys(v2).filter((name) => /Icon$/.test(name));

		expect(iconExports).toEqual([]);
	});

	test('does not export a standalone Skeleton (the loading placeholder belongs to the table)', () => {
		expect(v2).not.toHaveProperty('Skeleton');
	});

	test('does not export version-suffixed names (v2 is its own package)', () => {
		const suffixed = Object.keys(v2).filter((name) => /v2$/i.test(name));

		expect(suffixed).toEqual([]);
	});

	test('still exports the components', () => {
		['Accordion', 'Alert', 'Badge', 'Button', 'Checkbox', 'Table', 'Text', 'Tooltip'].forEach(
			(name) => {
				expect(v2).toHaveProperty(name);
			}
		);
	});
});
