'use strict';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const extractSass = new ExtractTextPlugin({
	// path: __dirname + '/public/css',
	filename: '[name].css',
	disable: process.env.NODE_ENV === 'development'
});
const minPlugin = new webpack.optimize.UglifyJsPlugin({
	compress: { warnings: false },
	// minimize: true,
});
module.exports = {
	context: __dirname + '/develop',
	entry: {
		application: './include.js',
		loading: './loading/loading.js',
		botWorker: './workers/botWorker',
		gameWorker: './workers/gameWorker',
		serviceWorker: './workers/serviceWorker',
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
	},
	watch: NODE_ENV === 'development',
	watchOptions: {
		aggregateTimeout: 500
	},
	devtool: NODE_ENV === 'development' ? 'source-map' : false,
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			// options: {
			// 	minimize: true,
			// },
		}, {
			test: /\.scss$/,
			use: extractSass.extract({
				fallback: 'style-loader',
				use: {
					loader: 'css-loader!sass-loader',
				},
			})
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: {
					loader: 'css-loader',
					// options: {
					// 	minimize: true,
					// },
				},
			})
		}, {
			test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
			// loader: 'url-loader?limit=30000&name=./[name]-[hash].[ext]',
			loader: 'url-loader?limit=30000&name=./[name].[ext]',
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		},
			// 	{
			// 	test: /\.pug$/,
			// 	loader: 'pug-loader'
			// }
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(NODE_ENV),
				BROWSER: JSON.stringify(true)
			}
		}),
		// minPlugin,
		extractSass,
	],
};