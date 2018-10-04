

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
        path: __dirname + '/dist',
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
        test: /\.css$/,
        use: [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                    modules: true, // default is false
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: "[name]--[local]--[hash:base64:8]"
                }
            },
          "postcss-loader"
        ]
        }
        ]
    },
}