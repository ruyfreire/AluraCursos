const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");

class App {
	constructor() {
		this.express = express();
		this.isDev = process.env.NODE_ENV !== "production";
	}

	middlewares() {
		this.express.use(express.urlencoded({ extended: true }));
	}

	views() {
		nunjucks.configure(path.resolve(__dirname, "views", "list"), {
			express: this.express,
			autoescape: true,
			watch: this.isDev
		});
		this.express.set("view engine", "njk");
	}

	rotas() {}
}

module.exports = new App().express;
