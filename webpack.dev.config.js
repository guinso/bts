const path = require('path');

module.exports = {
    target: "web",
    mode: 'development',
    entry: {
        app: ['./src/index-standalone.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bts.js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    devtool: 'inline-source-map'
}