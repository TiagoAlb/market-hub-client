const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: "./index.html"
    })
  ]
};