// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: process.env['REACT_APP_SPOTIFY_API_URL'],
			changeOrigin: true,
		}),
	);
};
