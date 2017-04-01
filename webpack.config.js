var path = require('path');

module.exports = {
    entry: [
        './client/index'
    ],
    output: {
        path: path.join(__dirname, 'public/js/build'),
        filename: 'build.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
};