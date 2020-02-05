const path = require('path');
const webpack = require('webpack');

const fileLoader = {
  loader: 'file-loader',
  options: {
    publicPath:'/'
  }
}

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader", 
                "sass-loader" 
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              fileLoader
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [fileLoader]
        }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            resolve: {
                extensions: ['.ts', '.tsx', '.wasm', '.mjs', '.js', '.json']
            },
        }]
    },
    watchOptions: {
        poll: true
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        })
    ],
    resolve: {
        symlinks: false,
        alias: {
            'vue$': path.resolve('node_modules/vue/dist/vue.esm.js'),
            'jquery': path.resolve('node_modules/jquery/src/jquery')
        }
    }
}
