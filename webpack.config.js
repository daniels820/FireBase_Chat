const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

console.log('process.env: ', nodeEnv);

const ROOT_PATH = path.join(__dirname, './static');
const sourcePath = path.join(ROOT_PATH, './src');
const buildPath = path.join(ROOT_PATH, './build');

const plugins = [
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new webpack.NamedModulesPlugin()
];

const jsEntry = [
    'index'
];

module.exports = {
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    context: sourcePath,
    entry: {
        js: jsEntry
    },
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: 'build/'
    },
    module: {
        noParse: /node_modules\/localforage\/dist\/localforage.js/,
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['eslint-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|cur|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ['url-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            sourcePath,
            'node_modules'
        ]
    },
    plugins: plugins,
    devServer: {
        contentBase: './static',
        historyApiFallback: true,
        port: 8080,
        compress: isProd,
        stats: { colors: true, progress: true }
    }
};