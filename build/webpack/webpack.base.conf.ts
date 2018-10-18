import * as webpack from "webpack";
import * as path from "path";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

export default async function createBaseConfig(isProd?: boolean) {
  const config: webpack.Configuration = {
    resolve: {
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, "../../src/tsconfig.json"),
        }),
      ],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts", ".json"],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            configFile: path.resolve(__dirname, "../../src/tsconfig.json"),
          },
        },
        {
          test: /\.s?css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                  require("autoprefixer")({
                    browsers: ["last 2 versions", "iOS >= 8", "cover 99%"],
                  }),
                  require("postcss-flexbugs-fixes")(),
                ],
              },
            },
            { loader: "sass-loader" },
          ],
        },
        {
          test: /\.(png|gif|svg|jpe?g)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "[hash:8]-[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader",
        },
      ],
    },
    plugins: [],
  };
  return config;
}
