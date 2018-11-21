const HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new 
    HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
          });
		  
module.exports = {
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