import getBaseConfig from "./webpack.base.conf";
import * as webpack from "webpack";
import * as merge from "webpack-merge";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as ScriptExt from "script-ext-html-webpack-plugin";
import * as CaseSensitivePlugin from "case-sensitive-paths-webpack-plugin";

const fixed = process.env.FIXED === "FIXED";

export default async function getDevConfig() {
  const rootPath = path.resolve(__dirname, `../..`);
  const srcPath = `${rootPath}/src`;

  const baseConfig = await getBaseConfig();
  const devConfig = merge({}, baseConfig, {
    mode: "development",
    devtool: "source-map",
    cache: true,
    devServer: {
      host: "127.0.0.1",
      disableHostCheck: true,
      port: 8083,
      hot: true,
    },
    entry: [
      // "react-hot-loader/patch",
      "webpack-hot-middleware/client?path=/webpack_hot&timeout=2000&overlay=false&reload=true",
      "webpack/hot/only-dev-server",
      `${srcPath}/index.tsx`,
    ],
    output: {
      filename: "[name].js",
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEBUG__: JSON.stringify(true),
      }),
      new HtmlWebpackPlugin({
        template: `${srcPath}/index.html`,
        filename: `rc-form-bug.html`,
        spmid: "888.1",
      }),
      new CaseSensitivePlugin({}),
      new ScriptExt({
        defaultAttribute: "defer",
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
  if (fixed) {
    devConfig.plugins!.push(
      new webpack.NormalModuleReplacementPlugin(
        /es\/createBaseForm\.js$/,
        path.resolve(__dirname, "../../src/createBaseForm.js"),
      ),
    );
  }
  return devConfig;
}
