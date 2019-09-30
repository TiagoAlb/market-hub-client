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
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          { loader: 'css-loader' }, 'postcss-loader',
          /*  { loader: 'postcss-loader', options: { sourceMap: true } },*/
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } }
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