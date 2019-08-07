const path = require('path');

module.exports = {
    target: "web",
    mode: 'production',
    entry: {
        app: ['./src/index-standalone.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bts.min.js'
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
                loader: ['style-loader','css-loader']
            }
        ]
    }
}