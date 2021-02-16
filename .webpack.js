const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  "home",
  "mairies-et-collectivites",
  "caves-et-cooperatives",
  "logistique-et-industrie",
  "travaux-publics",
  "contact",
  "qui-sommes-nous",
].map(page => {
  return {
    entry: path.resolve(__dirname, "src", page, "index.ts"),
    output: {
      path: path.resolve(__dirname, "dist", page),
      filename: "index.js",
    },
    resolve: {
      extensions: [".js", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.pug$/i,
          use: ["html-loader", "pug-html-loader"],
        },
        {
          test: /\.html$/i,
          use: {
            loader: "html-loader",
            options: {
              attributes: {
                list: [
                  {
                    tag: "link",
                    attribute: "href",
                    type: "src",
                  },
                  {
                    tag: "img",
                    attribute: "src",
                    type: "src",
                  },
                  {
                    tag: "source",
                    attribute: "src",
                    type: "src",
                  },
                ],
              },
            },
          },
        },
        {
          test: /global\.css$/i,
          use: ["file-loader", "extract-loader"],
        },
        {
          test: /\.css$/i,
          use: ["css-loader"],
        },
        {
          test: /\.(jpeg|png|svg|mp4)$/i,
          use: "file-loader",
        },
        {
          test: /\.(j|t)s$/i,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", page, "index.pug"),
        filename: "index.html",
        inject: "body",
      }),
    ],
  };
});
