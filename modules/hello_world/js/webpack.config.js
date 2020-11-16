// TODO: Allow to use production bundle minified
// Currently, it is necessary to disable minify javascript in drupal Administration

const path = require('path');
 
const config = {
  entry: './src/index.js',
  devtool: (process.env.NODE_ENV === 'production') ? false : 'inline-source-map',
  mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'hello_world.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    index: 'index.html',
    compress: true,
    port: 3000,
    proxy: {
      '/jsonapi': {
        target: 'http://localhost:8080'
      }
    },
    before: function(app, server, compiler) {
      app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname+'/index.html'));
      });
      app.get('/other', function(req, res) {
        res.json({ custom: 'response' });
      });
    }
  }
};
 
module.exports = config;