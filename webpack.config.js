const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = {
  entry: "/src/static/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "src", "static"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.SECRET": JSON.stringify(process.env.SECRET),
      "process.env.AUTH_URL": JSON.stringify(process.env.AUTH_URL),
      "process.env.AUTH_USER": JSON.stringify(process.env.AUTH_USER),
      "process.env.AUTH_PASSWORD": JSON.stringify(process.env.AUTH_PASSWORD),
      "process.env.AUTH_APP_ID": JSON.stringify(process.env.AUTH_APP_ID),
      // Add more environment variables here...
    }),
  ],
};
