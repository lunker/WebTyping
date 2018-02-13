const webpack=require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

console.log(path.join(__dirname, '.build'));


module.exports = {
    entry: [
			'webpack/hot/poll?1000',
			__dirname + '/server/server.js'
    ], // -- webpack을 수행할 bundle 대상 js file 들
		watch: true,
		target: 'node',
		externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
		module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },

    plugins: [
        new StartServerPlugin('server.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('server'),
                "BUILD_ENV": JSON.stringify('dev')
            }
        }),
    ],

    output : {
			path: path.join(__dirname, 'public'),
			filename : 'server.js'
    }

};
