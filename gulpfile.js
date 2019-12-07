"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var path = require('path');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));


var path = require('path');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');

gulp.task("sprite", function () {
    return gulp
        .src("source/img/icon-*.svg")
        .pipe(svgstore({
          inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("source/img"));
});
