const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/db", "/auth", "/roomCode"],
    createProxyMiddleware({
      target: "http://localhost:8080",
    })
  );
};
