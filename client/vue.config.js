const path = require('path')
const baseUrl = process.env.NODE_ENV === "production" ? "./" : "/";
module.exports = {
    publicPath:  './',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: false,
    runtimeCompiler: false,
    productionSourceMap: false,
    parallel: require('os').cpus().length > 1,
    chainWebpack: (config) => {

    },
    configureWebpack: (config) => {     
      Object.assign(config, {
        // 开发生产共同配置
        resolve: {
          extensions: ['.js', '.vue', '.json'], //请求本地json
          alias: {
            '@': path.resolve(__dirname, './src'),
            '@c': path.resolve(__dirname, './src/components'),
            '@w': path.resolve(__dirname, './src/views'),
            '@a': path.resolve(__dirname, './src/assets'),
          } // 别名配置
        }
      })
    },
    css: {
      // 启用 CSS modules
		modules: false,
		// 是否使用css分离插件
		extract: true,
		// 开启 CSS source maps，一般不建议开启
    sourceMap: false,
},
    // webpack-dev-server 相关配置
    // devServer: {
    //   open: true,
    //   host: '0.0.0.0',
    //   port: 8080,
    //   https: false,
    //   hotOnly: true,
    //   proxy: {
    //     '/api': {
    //       // 目标 API 地址
    //       target: ' http://47.115.169.55:3000/api/',
    //       // 如果要代理 websockets
    //       ws: true,
    //       changeOrigin: true, // 允许websockets跨域
    //       secure: false,
    //       pathRewrite: {
    //         '^/api': ''
    //       }
    //     }
    //   },
    //   before: app => {}
    //   }
    }