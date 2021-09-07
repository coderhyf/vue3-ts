module.exports = {
  lintOnSave: false,
  publicPath: "./",
  devServer: {
    proxy: {
      [`^${process.env.VUE_APP_TITLE_API}`]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_TITLE_API}`]: ""
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        cmp: "@/components"
      }
    }
  }
};
