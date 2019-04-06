const path = require("path")
const webpack = require("webpack")  // 引入插件
const htmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        path: path.join(__dirname, "./src/main.js")
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "bundle.js"
    },
    // 实现热刷新和自动编译
    devServer: {
        open: true,
        port: 8100,
        contentBase: path.join(__dirname, "./dist"),
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),    // 实现热刷新
        new htmlWebpackPlugin({
            template: path.join(__dirname, "./public/index.html"),   // 模板所在
            filename: "index.html", // 新生成文件的文件名
            hash: true  // 唯一身份标识，避免缓存
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {test: /\.css$/, use: ["style-loader", "css-loader"]},  // 顺序有严格要求，style-loader必须在前面
            {test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]},
            {test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
            {test: /\.(png|jpg|svg|gif)$/, use: "url-loader?limit=31421&name=[hash:8]-[name].[ext]"},
            { test:/\.(ttf|eot|svg|woff|woff2)/,use:'url-loader'},
            {test: /\.js$/, use: "babel-loader", exclude: /node_modules/},   // exclude表示解析时派出node_modules目录中的js文件
            {test: /\.vue$/, use: "vue-loader"}
        ]
    }

}