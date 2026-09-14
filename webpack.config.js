const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appSrc = path.resolve(__dirname, 'src');
const scratchPaintSrc = path.resolve(__dirname, 'node_modules/scratch-paint');

module.exports = {
    entry: './src/index.jsx',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/[name].[contenthash].js',
        publicPath: './',
        clean: true
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [appSrc, scratchPaintSrc],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: 'defaults'}],
                            ['@babel/preset-react', {runtime: 'automatic'}]
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/i,
                type: 'asset'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'Scratch SVG Editor'
        })
    ],

    devServer: {
        static: path.join(__dirname, 'dist'),
        host: '0.0.0.0',
        port: 8080,
        hot: true
    }
};
