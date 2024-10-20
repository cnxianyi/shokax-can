const gulp = require('gulp');
const path = require('path');

const paths = {
    src: './cover/*.pug',  // 匹配所有 .pug 文件
    dest: './node_modules/hexo-theme-shokax/layout/'  // 目标文件夹
};

function copyPugFiles() {
    return gulp.src(paths.src)
        .pipe(gulp.dest(paths.dest));  // 复制到目标文件夹
}

exports.default = gulp.series(copyPugFiles);
