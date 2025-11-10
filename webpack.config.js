const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const path = require("path");

const publicUrl = process.env.PUBLIC_URL || "http://localhost:3001/";

module.exports = {
  entry: "./src/index.ts",
  mode: process.env.NODE_ENV || "development",
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  output: {
    publicPath: publicUrl,
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "profile",
      filename: "remoteEntry.js",
      exposes: {
        "./Profile": "./src/profile.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
