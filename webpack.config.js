const HTML = require("html-webpack-plugin");

const IS_RSPACK = process.env.RSPACK;

const CssExtractPlugin = IS_RSPACK
  ? require("@rspack/core").CssExtractRspackPlugin
  : require("mini-css-extract-plugin");

/**@type {import('webpack').Configuration} */
const config = {
  entry: {
    main: ["./src/index.css", "./src/index.js"],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [CssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HTML(),
    new CssExtractPlugin({
      chunkFilename: "static/[name].css",
      chunkFilename: "async/[name].css",
    }),
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  experiments: {
    lazyCompilation: {
      entries: false,
      imports: true,
    },
  },
};

module.exports = config;
