const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: ["./frontend/portal/index.js"],
    admin: ["./frontend/admin/index.js"],
  },
  output: {
    path: path.resolve(path.dirname(__dirname), "assets"),
    filename: "[name].[fullhash].dev.js",
    publicPath: "https://maptocanada.ca/",
    chunkFilename: "[name].[id].js",
  }, // output
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "../frontend/utils"),
      "@portal": path.resolve(__dirname, "../frontend/portal"),
      "@admin": path.resolve(__dirname, "../frontend/admin"),
    },
    fallback: {
      punycode: false,
      assert: false,
    }, //fallback
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
        exclude: /node_modules|zip/,
        use: [
          MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },
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
          MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },
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
      }, // less -> css

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
    // const BundleTracker = require("webpack-bundle-tracker");
    // new BundleTracker({
    //   path: path.dirname(__dirname),
    //   filename: "./webpack-stats.json",
    // }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./frontend/portal/index.html",
      chunks: ["index"],
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
      PATH_PREFIX: JSON.stringify(process.env.PATH_PREFIX),
      API_HOST: JSON.stringify(process.env.API_HOST),
      API_PREFIX: JSON.stringify(process.env.API_PREFIX),
    }), // Define plugin
    new MiniCssExtractPlugin({
      chunkFilename: "[name].[hash].css",
      filename: "[name].css",
    }), // MiniCssExtractPlugin
  ], //plugins
};
