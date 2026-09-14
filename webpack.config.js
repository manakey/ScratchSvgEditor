const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/[name].[contenthash].js',
        publicPath: './',
        clean: true
    },
    resolve: {extensions: ['.js', '.jsx']},
    module: {
        rules: [
            {test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.css$/i, use: ['style-loader', 'css-loader']},
            {test: /\.(svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/i, type: 'asset'}
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: './public/index.html', title: 'Scratch SVG Editor'})],
    devServer: {static: path.join(__dirname, 'dist'), host: '0.0.0.0', port: 8080, hot: true}
};
