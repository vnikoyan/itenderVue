module.exports = {
  chainWebpack: config => {
    config.module
      .rule('html')
      .test(/\.html$/)
      .use('vue-html-loader')
      .loader('vue-html-loader')
  }
};
