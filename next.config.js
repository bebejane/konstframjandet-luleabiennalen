const webpack = require("webpack");
const i18nPaths = require("./lib/i18n/paths.json");

const sassOptions = {
	includePaths: ["./components", "./pages"],
	prependData: `
    @use "sass:math";
    @import "./lib/styles/mediaqueries"; 
    @import "./lib/styles/fonts";
  `,
};

const nextOptions = {
	i18n: {
		locales: ["sv", "en"],
		defaultLocale: "sv",
		localeDetection: false,
	},
	async rewrites() {
		return Object.keys(i18nPaths).map((k) => ({
			destination: `/en/${i18nPaths[k].sv}/:path*`,
			source: `/en/${i18nPaths[k].en}/:path*`,
			locale: false,
		}));
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	devIndicators: {
		buildActivity: false,
	},
	experimental: {
		scrollRestoration: true,
	},
	webpack: (config, ctx) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: "graphql-tag/loader",
		});
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			exclude: /node_modules/,
			use: ["@svgr/webpack"],
		});
		config.plugins.push(
			new webpack.DefinePlugin({
				__DEV__: process.env.NODE_ENV === "development",
			})
		);
		return config;
	},
};

/**
 * @type {import('next').NextConfig}
 */
const config = { sassOptions, ...nextOptions };
module.exports = config;
