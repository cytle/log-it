const path = require('path');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            // the 'transform-runtime' plugin tells babel to require the runtime
            // instead of inlining it.
            {
                test: /\.js$/,
                exclude: /(node_modulesd)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            es2015: {
                                modules: true,
                            },
                        }],
                    ],
                    plugins: [
                        // 'external-helpers',
                        ['transform-object-rest-spread', { useBuiltIns: true }],
                    ],
                },
            },
        ],
    },
};
