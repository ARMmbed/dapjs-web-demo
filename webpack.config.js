const path = require('path');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, './bin'),
        filename: 'dap.bundle.js'
    },
    resolve: {
        extensions: [".webpack.js", ".ts", ".js"]
    },
    module: {
        loaders: [
            { test: /.tsx?$/, loader: "ts-loader" }
        ]
    },
    devtool: 'source-map'
};
