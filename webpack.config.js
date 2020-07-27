/**
 * @module		webpack配置文件
 * @author      nayo
 * @date        2020/7/27 10:16 上午
 * @version     1.0
 */
const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
	entry: './src/Main.ts',
	// devtool: 'source-map',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: __dirname + '/src',
				loader: 'babel-loader'
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@': './src/'
		}
	},
	output: {
		filename: 'rot-storage.js',
		path: path.resolve(__dirname, 'dist'),
		sourceMapFilename: 'rot-storage.js.map',
		library: 'RotStorage',
		libraryTarget: 'umd'
	},
	plugins: [
		new HtmlWebpackPlugin(),
		new CleanWebpackPlugin({
			outputPath: path.resolve(__dirname, 'dist'),
			verbose: true,
			dry: false
		})
	]
};