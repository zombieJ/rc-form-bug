import * as webpack from "webpack";
import getConfig from "../webpack/webpack.prod.conf";

getConfig().then(config => {
  const compiler = webpack(config, (err, stats) => {
    if (err) {
      console.error(err);
    }
    console.log(
      // 到 node_modules/webpack/lib/Stats 查看stats的toString用法。
      stats.toString({
        ...(webpack.Stats as any).presetToOptions(true),
        colors: true,
      }),
    );
  });
  new webpack.ProgressPlugin().apply(compiler as webpack.Compiler);
});
