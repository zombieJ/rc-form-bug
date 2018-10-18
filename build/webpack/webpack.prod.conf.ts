import getBaseConfig from "./webpack.base.conf";
import * as webpack from "webpack";
import * as merge from "webpack-merge";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as ScriptExt from "script-ext-html-webpack-plugin";
import * as UglifyJsPlugin from "uglifyjs-webpack-plugin";
import * as OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as CleanWebpackPlugin from "clean-webpack-plugin";

export default async function getDevConfig() {
  const rootPath = path.resolve(__dirname, `../..`);
  const srcPath = `${rootPath}/src`;

  const baseConfig = await getBaseConfig(true);

  const outputPath = path.resolve(__dirname, "../../dist");

  const devConfig = merge({}, baseConfig, {
    mode: "production",
    // mode: "development",
    // devtool: "source-map",
    entry: [`${srcPath}/polyfills.ts`, `${srcPath}/index.tsx`],
    output: {
      path: outputPath,
      filename: "[name].[chunkhash:8].js",
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
          // uglifyOptions: {
          //   ie8: false,
          //   ecma: 8,
          //   warnings: false,
          // },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        // apiBilibiliCom: "api.bilibili.com",
        // prot: JSON.stringify(""),
        __DEBUG__: JSON.stringify(false),
      }),
      new HtmlWebpackPlugin({
        template: `${srcPath}/index.html`,
        filename: "index.html",
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
      }),
      new ScriptExt({
        defaultAttribute: "defer",
      }),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      }),
      new CleanWebpackPlugin([outputPath], {
        root: rootPath,
      }),
    ],
  });
  return devConfig;
}
