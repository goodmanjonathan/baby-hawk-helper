const HtmlWebpackPlugin = require('html-webpack-plugin');
const { rules } = require('webpack-atoms');

var HTMLWebpackPluginConfig = new
		HtmlWebpackPlugin({
						template: './src/index.html',
						filename: 'index.html',
						inject: 'body'
					});

module.exports = {
<<<<<<< HEAD
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist', // maybe path.resolve(__dirname, 'dist') ?
        filename: 'index_bundle.js'
    },
    plugins: [
        HTMLWebpackPluginConfig
    ],
    module: { 
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
        },
		{
			test:/\.(png|jpg|gif)$/,
			use:[
			{
				loader: "file-loader",
				options: {
					name: '[path][name].[ext]'
				}
			}
			]
		}
        ]
    }
}
=======
		entry: './src/index.js',
		output: {
				path: __dirname + '/dist', // maybe path.resolve(__dirname, 'dist') ?
				filename: 'index_bundle.js'
		},
		plugins: [
				HTMLWebpackPluginConfig
		],
		module: {
				rules: [
				rules.js(),
				rules.images(),
				rules.css(),
				]
		}
}
>>>>>>> 4bc8f964efd7fced275cfe2d0b72a954d2e6ba72
