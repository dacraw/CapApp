const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/cap_app.jsx",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
};

// from  https://dev.to/riyanegi/setting-up-webpack-5-with-react-and-babel-from-scratch-2021-271l
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   // Where files should be sent once they are bundled
//   output: {
//     path: path.join(__dirname, "app", "assets", "javascripts"),
//     filename: "index.bundle.js",
//   },
//   // webpack 5 comes with devServer which loads in development mode
//   devServer: {
//     port: 3000,
//     watchContentBase: true,
//   },
//   // Rules of how webpack will take our files, complie & bundle them for the browser
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /nodeModules/,
//         use: {
//           loader: "babel-loader",
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({ template: "app/views/static_pages/root.html.erb" }),
//   ],
// };
