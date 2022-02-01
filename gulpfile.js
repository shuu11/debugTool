//----------------------------------------------------------------------
//  mode
//----------------------------------------------------------------------
"use strict";

//----------------------------------------------------------------------
//  変数宣言
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");

const $ = require("gulp-load-plugins")({
	pattern: [
		"gulp{-,.}*", //  autoprefixer,plumber,dartSass,sassGlobUseForward

		"browser-sync",
	],
});

const watchSrc = ["./**", "!./src/css/**"];

const buildPath = {
	sass: {
		src: "./src/scss/**/*.scss",
		dest: `./src/css/`,
	},
};

const bsPath = {
	proxy: "shuu11.wp",
};

//----------------------------------------------------------------------
//  task処理
//----------------------------------------------------------------------
function build(done) {
	src(buildPath.sass.src)
		.pipe($.sassGlobUseForward())
		// .pipe($.sassGlob())
		.pipe($.plumber())
		.pipe($.dartSass())
		.pipe($.autoprefixer())
		.pipe(dest(buildPath.sass.dest))
		.pipe( $.browserSync.stream());

	done();
}

function bs(done) {
	$.browserSync.init({
		// files: watchSrc,
		// proxy: bsPath.proxy,
		// port: 80,
		server: {
      baseDir: "./"
    },
    startPath: "src/index.html",
		notify: false,
		open: "external",
	});

	done();
}

function bsReload(done) {
	$.browserSync.reload();

	done();
}

//----------------------------------------------------------------------
//  watch処理
//----------------------------------------------------------------------
function watchTask(done) {
	watch(watchSrc, series(build, bsReload));
}

//----------------------------------------------------------------------
//  default処理
//----------------------------------------------------------------------
exports.build = series(build);
exports.default = series(build, bs, bsReload, watchTask);

/************************************************************************/
/*  END OF FILE                                                         */
/************************************************************************/
