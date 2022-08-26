const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		["/db", "/auth", "/api"],
		createProxyMiddleware({
			target: "http://localhost:8080",
		})
	);
};
