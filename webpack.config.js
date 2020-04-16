var webpack = require('webpack');
const path = require("path");

var DEV_PATH = path.resolve(__dirname, 'out/modules');
var BUILD_PATH = path.resolve(__dirname, 'out');

var libraryName = 'YControl';

module.exports = {
    devtool: "source-map",
    entry: "./RectPlayer/RectPlayer.ts",
    output: {
        path: BUILD_PATH,
        filename: "rectPlayer.js",
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
    target: "web",
    watch: false,
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            //{ loader: 'babel-loader', },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: path.resolve(__dirname, 'RectPlayer')
            }
        ]
    },
    externals: {
        "xml-js": {
            root: "window",
            commonjs: "global",
            commonjs2: "global",
        },
        "less": {
          root: "window",
          commonjs: "global",
          commonjs2: "global",
      },
    },
    plugins: [
        //new webpack.BannerPlugin(libraryName),
        new webpack.ProvidePlugin({
            '__extends': [path.resolve(__dirname, 'RectPlayer/extends.js'), '__extends'],
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: false
        })
    ]);
}