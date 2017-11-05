"use strict";

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = {
	entry: './develop/include.js',
	output: {
		filename: 'application.js',
		path: __dirname + '/public',
	},

	// watch: NODE_ENV === 'development',
	watch: false,
	watchOptions: {
		aggregateTimeout: 1000
	},

	// devtool: NODE_ENV === 'development' ? "source-map" : null,
	devtool: false,


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
		}, {
			test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
			loader: 'url-loader?limit=30000&name=./[name]-[hash].[ext]',
		}, {
			test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
			loader: "imports-loader?this=>window"
		}, {
			test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
			loader: "imports-loader?define=>false"
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}],
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(NODE_ENV),
				BROWSER: JSON.stringify(true)
			}
		}),
		new ExtractTextPlugin('./application.css'),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			'window.jQuery': 'jquery',
		})
	],

	resolve: {
		alias: {
			jquery: "jquery/src/jquery"
		}
	}
};