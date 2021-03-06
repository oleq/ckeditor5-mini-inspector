/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* eslint-env node */

const TerserPlugin = require( 'terser-webpack-plugin' );
const path = require( 'path' );

module.exports = ( env, argv ) => {
	const devMode = argv.mode === 'development';

	return {
		mode: argv.mode || 'production',
		entry: path.resolve( __dirname, 'src', 'miniinspector.js' ),
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: [
							[
								'@babel/react',
								{
									development: devMode
								}
							]
						]
					}
				},
				{
					test: /\.css$/,
					loaders: [
						{
							loader: 'style-loader',
							options: {
								injectType: devMode ? 'styleTag' : 'singletonStyleTag',
								attributes: {
									'data-cke-inspector': true
								}
							}
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: devMode
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: devMode,
								config: {
									ctx: {
										cssnano: !devMode
									}
								}
							}
						}
					]
				},
				{
					test: /\.svg$/,
					loaders: [
						{
							loader: 'babel-loader',
							query: {
								presets: [
									[
										'@babel/react',
										{
											development: devMode
										}
									]
								]
							}
						},
						{
							loader: 'react-svg-loader',
							options: {
								jsx: true
							}
						}
					]
				}
			]
		},
		optimization: {
			minimize: !devMode,
			minimizer: [ new TerserPlugin() ]
		},
		output: {
			path: path.resolve( __dirname, 'build' ),
			library: 'MiniCKEditorInspector',
			filename: 'miniinspector.js',
			libraryTarget: 'umd',
			libraryExport: 'default'
		}
	};
};
