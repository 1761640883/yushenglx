module.exports = {
  publicPath: '/yusheng',
  devServer: {
    proxy: {
      '/api2': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      },
      '/ajax': {
        target: 'https://m.maoyan.com/',
        changeOrigin: true
      }
    }
  }
}