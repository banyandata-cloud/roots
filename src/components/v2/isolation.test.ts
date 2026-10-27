import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

// v2 is published as its own package, so nothing in it may import from v1 (or any other code
// outside src/components/v2). Shared data lives in design-system/ and is read by the token
// generator only.
const V2_ROOT = __dirname;
const SOURCE = /\.(tsx?|jsx?|scss|css)$/;
const SPECIFIER =
	/(?:from|import|require\(|jest\.mock\(|jest\.requireActual\(|@use|@import|@forward|url\()\s*\(?\s*['"]([^'"]+)['"]/g;

const listFiles = (dir: string): string[] =>
	readdirSync(dir).flatMap((entry) => {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) return entry === 'node_modules' ? [] : listFiles(path);
		return SOURCE.test(entry) && entry !== 'isolation.test.ts' ? [path] : [];
	});

describe('v2 isolation', () => {
	test('no file imports from outside src/components/v2', () => {
		const escaping: string[] = [];

		listFiles(V2_ROOT).forEach((file) => {
			const source = readFileSync(file, 'utf8');
			Array.from(source.matchAll(SPECIFIER)).forEach(([, specifier]) => {
				if (!specifier) return;
				const aliased = specifier.startsWith('@/') || specifier.startsWith('~');
				const relative = specifier.startsWith('.');
				if (
					aliased ||
					(relative && !resolve(dirname(file), specifier).startsWith(V2_ROOT))
				) {
					escaping.push(`${file.replace(V2_ROOT, 'v2')}: ${specifier}`);
				}
			});
		});

		expect(escaping).toEqual([]);
	});

	test('no file references the v1 package name', () => {
		const offenders = listFiles(V2_ROOT).filter((file) =>
			readFileSync(file, 'utf8').includes('@banyan_cloud/roots')
		);

		expect(offenders.map((file) => file.replace(V2_ROOT, 'v2'))).toEqual([]);
	});
});
