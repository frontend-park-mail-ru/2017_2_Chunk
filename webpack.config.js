'use strict';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = {
	context: __dirname + '/develop',
	entry: {
		application: './include.js',
		loading: './loading/loading.js',
		botWorker: './workers/botWorker',
		gameWorker: './workers/gameWorker',
		serviceWorker: './workers/gameWorker',
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
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		},
		// 	{
		// 	test: /\.scss$/,
		// 	use: [{
		// 		loader: 'style-loader'
		// 	}, {
		// 		loader: 'css-loader'
		// 	}, {
		// 		loader: 'sass-loader',
		// 	}]
		// },
			{
			test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
			loader: 'url-loader?limit=30000&name=./[name]-[hash].[ext]',
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
	plugins:
		[
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(NODE_ENV),
					BROWSER: JSON.stringify(true)
				}
			}),
			new ExtractTextPlugin('./application.css'),
		],
}
;