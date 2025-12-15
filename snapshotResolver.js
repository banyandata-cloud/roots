// snapshotResolver.js
module.exports = {
	resolveSnapshotPath: (testPath, snapshotExtension) =>
		// replace .test.tsx or .test.ts with .snap (next to test file)
		testPath.replace(/\.test\.(tsx|ts)$/, `.snap`),

	resolveTestPath: (snapshotPath, snapshotExtension) =>
		snapshotPath.replace(/\.snap$/, `.test.tsx`),

	testPathForConsistencyCheck: 'example.test.tsx',
};
