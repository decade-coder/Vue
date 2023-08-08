const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      // 配置跨域
      "/api": {
        target: "http://localhost:8000", // 替换为实际需要访问的接口地址
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 如果需要去掉路径中的 '/api' 前缀，可以通过这个配置实现
        },
      },
    },
  },
});
