import * as DevMiddleware from "webpack-dev-middleware";
import * as HotMiddleware from "webpack-hot-middleware";
import * as webpack from "webpack";
import getConfig from "../webpack/webpack.dev.conf";
import * as express from "express";

getConfig().then(config => {
  const compiler = webpack(config);
  new webpack.ProgressPlugin().apply(compiler);
  const server = express();
  server.use(
    DevMiddleware(compiler, {
      publicPath: config.output!.publicPath!,
    }),
  );
  server.use(
    HotMiddleware(compiler, {
      path: "/webpack_hot",
    }),
  );
  server.listen(config.devServer!.port || 8082);
});
