var gulp = require("gulp"),
	imagemin = require("gulp-imagemin"),
	clean = require("gulp-clean"),
	cssmin = require("gulp-cssmin"),
	uglify = require("gulp-uglify"),
	usemin = require("gulp-usemin"),
	htmlMin = require("gulp-htmlmin"),
	inlinesource = require("gulp-inline-source");

gulp.task("default", ["copy"], function(){
	gulp.start("html-min", ["build-img", "inline", "min-css", "min-js"]);
});

//fazer copia de arquivos na pasta dist, após executar tarefa clean
gulp.task("copy", ["clean"], function(){
	return gulp.src("src/**/*")
		.pipe(gulp.dest("dist"));
});

//apagar pasta dist
gulp.task("clean", function(){
	return gulp.src("dist")
		.pipe(clean());
});

//otimizar as imagens da pasta dist
gulp.task("build-img", function(){
	gulp.src("dist/imagens/**/*.png")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/imagens"));
});

//inline de recursos css e js
gulp.task("inline", function(){
	return gulp.src("dist/*.html")
		.pipe(inlinesource())
		.pipe(gulp.dest("dist"));
});

//minificar de css
gulp.task("min-css", function(){
	return gulp.src("dist/css/*.css")
		.pipe(cssmin())
		.pipe(gulp.dest("dist/css"));
});

//minificar de js
gulp.task("min-js", function(){
	return gulp.src("dist/js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
});

//minifica html
gulp.task("html-min", function(){
	return gulp.src("dist/*.html")
	.pipe(htmlMin({
		collapseInlineTagWhitespace: true,
		collapseWhitespace: true,
		removeComments: true
	}))
	.pipe(gulp.dest("dist"));
});
