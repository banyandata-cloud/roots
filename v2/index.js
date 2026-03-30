// V2 Components - CommonJS
try {
	module.exports = require('../dist/cjs/v2/index.js');
} catch (e) {
	// Fallback for development/testing
	module.exports = {};
}
