export default {
  // Entrypoint of the application. It is named main since that
  // is most common in other programming environments.
  entry: [
    // Entry point files.
    "./src/main.js",
    "./src/index.html"
  ],

  // Output of the built files to the specified path and filename.
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },

  // Each file that is processed can be optionally handled by a 'loader'
  // which acts as a preprocessor.
  module: {
    loaders: [
      // The babel-loader handles all the transpilation work with
      // ES 2015 and JSX. See .babelrc for specifics about the configuration.
      {
        text: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      // The file loader allows for webpack to copy other static assets.
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      }
    ]
  }
}
