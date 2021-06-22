const path = require('path');

module.exports = {
	mode: 'production',

	entry: './lib/index.js',

	output: {
		path: __dirname + '/dist/',
		filename: 'index.js',
		libraryTarget: 'module',
	},
	optimization: {
		minimize: false,
	},
	experiments: {
		outputModule: true,
	},
};
