require("monaco-editor-webpack-plugin");
module.exports = {
  devServer: {
    // port: 3000,
    proxy: {
      "/api": {
        // target: "http://59.110.52.247:8121",
        // target: "https://59.110.52.247:8121",
        target: "http://localhost:8121",
        // target: "https://lyzok.top:8121",
        // target: "https://lyzok.top",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
