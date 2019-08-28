const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, "../example/index")
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js"
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "../components"),
            path.resolve(__dirname, "../example"),
			"node_modules"
        ],
        alias: {
			"@components": path.resolve(__dirname, "../components"),
            "@example": path.resolve(__dirname, "../example"),
            "@fonts": "example/fonts",
			"@asstes": "example/assets",
			"@containers": "example/containers",
			"@mock": "example/mock",
			"@router": "example/router",
			"@store": "example/store",
			"@styles": "example/styles",
			"@utils": "example/utils"
		},
		extensions: [".html", ".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".sass", ".less", ".json"] //自动解析的扩展
    },
    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            include: [path.resolve(__dirname, "../components"), path.resolve(__dirname, "../example")],
            exclude: [/node_modules/],
            loader: ["babel-loader", "eslint-loader"]
        }, {
            test: /\.(tsx|ts)$/,
            include: [path.resolve(__dirname, "../components"), path.resolve(__dirname, "../example")],
            exclude: [/node_modules/],
            use: [{
                loader: "ts-loader",
            }]
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            use: [{
                loader: "url-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "./assets",
                    publicPath: "../assets"
                }
            }]
        }, {
            test: /\.(eot|woff2?|ttf|svg)$/,
            use: [{
                loader: "url-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "./fonts",
                    publicPath: "../fonts"
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "../views/index.html")
        }),
        new webpack.ProvidePlugin({
            _: "lodash"
        })
    ]
}