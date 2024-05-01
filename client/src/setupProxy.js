const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/signIns", "/auth", "/roomCode", "/users", "/profile"],
    createProxyMiddleware({
      target: "http://localhost:8080",
    })
  );
};
