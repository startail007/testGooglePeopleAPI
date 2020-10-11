const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const WebpackCopyPlugin = require("copy-webpack-plugin"); //資料複製
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); //壓縮css
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清除檔案資料
const WebpackCDNInject = require("webpack-cdn-inject");
module.exports = {
  resolve: {
    //擴展路徑別名
    alias: {
      "@fonts": path.resolve(__dirname, "./src/fonts/"),
      "@img": path.resolve(__dirname, "./src/img/"),
      "@css": path.resolve(__dirname, "./src/css/"),
      "@js": path.resolve(__dirname, "./src/js/"),
      "@src": path.resolve(__dirname, "./src/"),
      vue: "vue/dist/vue.esm.js",
    },
    //擴展副檔名
    extensions: [".js", ".json"],
  },
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "js/[name].[hash].js",
  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    compress: true,
    port: 9007,
    inline: true,
  },
  module: {
    rules: [
      //css提取
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
        ],
      },
      //圖檔載入器
      {
        test: /\.(png|jpg|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[hash].[ext]",
            },
          },
        ],
      },
      //字型載入器
      {
        test: /\.(woff|woff2|eot|ttf|otf|ttc)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[hash].[ext]",
            },
          },
        ],
      },
      //js轉舊
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["./*"],
    }),
    /*new WebpackCopyPlugin({
      patterns: [{ from: "./src/google/google7cf3832be366e86b.html", to: "" }],
    }),*/
    new MiniCssExtractPlugin({ filename: "css/[name].[hash].css" }),
    new HtmlWebpackPlugin({
      title: "test",
      template: "./src/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      title: "privacy",
      template: "./src/privacy.html",
      filename: "privacy.html",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new WebpackCDNInject({
      head: ["https://apis.google.com/js/platform.js"],
    }),
  ],
};
