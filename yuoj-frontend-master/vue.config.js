require("monaco-editor-webpack-plugin");
module.exports = {
  devServer: {
    // port: 3000,
    proxy: {
      "/api": {
        // target: "http://59.110.52.247:8121",
        target: "http://localhost:8121",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
