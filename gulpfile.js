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
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var del = require('del');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series('html', 'refresh'));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([include()]))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("sprite", function () {
    return gulp
        .src("source/img/icon-*.svg")
        .pipe(svgstore({
          inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{jpg,svg}")
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
      ]))
      .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function (){
  return gulp.src([
    "source/fonts/**/*.{woff, woff2}",
    "source/img/*.webp",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task('compressjs', function () {
  return pipeline(
        gulp.src('source/js/*.js'),
        uglify(),
        gulp.dest('build/js')
  );
});

gulp.task("build", gulp.series('clean', 'copy', 'css', 'sprite', 'images', 'compressjs', 'html'));
gulp.task("start", gulp.series("build", "server"));
