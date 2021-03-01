const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  entry: {
    portal: ["react-hot-loader/patch", "./frontend/portal/index.js"],
    admin: ["react-hot-loader/patch", "./frontend/admin/index.js"],
  },
  output: {
    path: path.resolve(path.dirname(__dirname), "assets"),
    filename: "[name].[fullhash].dev.js",
    publicPath: "http://localhost:9000/assets/",
    chunkFilename: "[name].[id].js",
  }, // output
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "../frontend/utils"),
      "@portal": path.resolve(__dirname, "../frontend/portal"),
      "@admin": path.resolve(__dirname, "../frontend/admin"),
    },
    fallback: {
      "punycode": false,
      "assert": false,
    },//fallback
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      name: "vendor",
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules|zip/,
      }, //JSX and JS -> babel-loader

      {
        test: /\.less$/,
        exclude: /zip/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "less-loader" },
        ],
      }, // less -> css

      {
        test: /antd\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        ],
      }, // antd.less -> css

      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      }, // Images -> url
    ], // rules
  }, // module
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    // For webpack-bundle-tracker@0.4.3
    // new BundleTracker({
    //   path: path.dirname(__dirname),
    //   filename: "./webpack-stats.json",
    // }),
    new ESLintPlugin({
      context: path.join(path.dirname(__dirname), "frontend"),
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./frontend/portal/index.html",
      chunks: ["portal"],
      hash: true,
    }), // HTML plugin - portal
    new HtmlWebpackPlugin({
      filename: "admin.html",
      template: "./frontend/admin/index.html",
      chunks: ["admin"],
      hash: true,
    }), // HTML plugin - admin
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      PATH_PREFIX: JSON.stringify(""),
      API_HOST: JSON.stringify("http://localhost:8000"),
      API_PREFIX: JSON.stringify("/api"),
    }), // Define plugin
  ], //plugins
  devServer: {
    contentBase: path.join(__dirname, "assets"),
    historyApiFallback: {
      rewrites: [
        { from: /^\/admin/, to: "/assets/admin.html" },
        { from: /^\//, to: "/assets/index.html" },
      ], // rewrites
    },
    compress: true,
    hot: true,
    disableHostCheck: true,
    port: 9000,
    host: "0.0.0.0",
    public: "http://localhost:9000",
    publicPath: "/assets",
    serveIndex: true,
    sockPath: "/socket",
  }, // devServer
};
