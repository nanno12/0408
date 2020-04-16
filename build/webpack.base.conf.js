var webpack = require("webpack")
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/app/main.js"]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js' ,
      '@': resolve('src'),
      '@techCommon': resolve('node_modules/wn-tech-common/lib'),
      jquery: "jquery/src/jquery",
      'app':path.resolve(__dirname, '../src/app'),
      'modules':path.resolve(__dirname, '../src/modules')
    }  
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), 
                  resolve('test'),
                  resolve('node_modules/wn-tech-ui/src'),
                  resolve('node_modules/wn-tech-common/lib')
                ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: utils.assetsPath('static/img/[name].[ext]')
         
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: utils.assetsPath('static/fonts/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    }),
    // new webpack.DllReferencePlugin({
    //     context: path.resolve(__dirname, '..'),
    //     manifest: require('../static/js/libs/thirdlib_manifest.json')
    // }),
  ],
//   externals: {
//     jquery: "jQuery",
//     echarts:"echarts"
//   },
}
