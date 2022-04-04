const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
    assetModuleFilename: "images/[hash][ext]"
    // assetModuleFilename: "fonts/[hash][ext]"
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist")
    }
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer", { grid: "autoplace" }]]
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              // ローダーに dart-sass を使用することを明示的に指定
              implementation: require("sass")
            }
          }
        ]
      },

      {
        test: /\.js$/,
        exclude: /nodemodules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },

      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              // All default supported tags and attributes
              "...",
              {
                tag: "img",
                attribute: "data-src",
                type: "src"
              },
              {
                tag: "img",
                attribute: "data-srcset",
                type: "srcset"
              },
              {
                tag: "source",
                attribute: "data-srcset",
                type: "srcset"
              }
            ],
            urlFilter: (attribute, value, resourcePath) => {
              // The `attribute` argument contains a name of the HTML attribute.
              // The `value` argument contains a value of the HTML attribute.
              // The `resourcePath` argument contains a path to the loaded HTML file.

              if (/example\.pdf$/.test(value)) {
                return false;
              }

              return true;
            }
          }
        }
      },

      {
        test: /\.(gif|png|jpe?g|svg|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]"
        }
      },
      {
        test: /\.(tty|otf|woff2?|eot|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]"
        }
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css"
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body"
    })
  ],

  target: ["web", "es5"]
};
