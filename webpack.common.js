const HtmlWebpackPlugin = require('html-webpack-plugin');
const { rules } = require('webpack-atoms');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/client/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: './src/client/index.js',
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
