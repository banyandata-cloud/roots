module.exports = {
	testEnvironment: 'jsdom',

	modulePathIgnorePatterns: ['<rootDir>/.bun/'],

	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
	},

	moduleNameMapper: {
		'\\.(css|scss|sass)$': 'identity-obj-proxy',
		'\\.(png|svg)$': '<rootDir>/__mocks__/fileMock.js',
		'^@/(.*)$': '<rootDir>/src/$1',

		// *** FINAL WORKING FIX ***
		'^react-syntax-highlighter(/.*)?$': '<rootDir>/__mocks__/react-syntax-highlighter.js',

		'^react-merge-refs$': '<rootDir>/__mocks__/react-merge-refs.js',
	},

	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

	testMatch: ['**/*.test.(ts|tsx)'],

	snapshotResolver: '<rootDir>/snapshotResolver.js',
};
