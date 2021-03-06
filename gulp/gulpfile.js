const gulp = require('gulp')
// 压缩
const uglify = require('gulp-uglify');
// 合并 https://www.npmjs.com/package/gulp-concat
const concat = require('gulp-concat');
// 创建启动服务 https://www.npmjs.com/package/gulp-connect
const connect = require('gulp-connect');

const less = require('gulp-less');

const data = require('gulp-data');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename')



// 创建任务
gulp.task('connect', () => {
	return connect.server({
		// port: 8888,
		root: './dist', //配置访问根目录
		livereload: true //是使用热加载
	});
});
//将静态文件拷贝到对应的文件夹如 不要压缩的 html 图片 文档等资源
gulp.task('copy', () => {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist/'));
})
//热加载html
gulp.task('html', () => {
	return gulp.src('./dist/*.html')
		.pipe(connect.reload());
})
//合并
gulp.task('concat', () => {
	return gulp.src(['./src/js/base.js', './src/js/style.js', './src/js/animal.js'])
		.pipe(concat('bunddle.js'))
		.pipe(gulp.dest('./dist/js/'))
});

gulp.task('less', () => {
	return gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('dist/css/'));

});
//监视程序
gulp.task('watch', () => {
	gulp.watch(['./src/js/*.js'], ['concat']);
	gulp.watch(['./src/*.html'], ['copy']);
	gulp.watch(['src/less/*.less'], ['less']);
	gulp.watch(['./dist/*.html'], ['html']); //如果html变化，就调用html任务重加载页面html
})

gulp.task('ejs', () => {
	return gulp.src('src/ejs/*.ejs')
		.pipe(data((file) => {
			return { local: { title: 'hello ejs!' } }
		}))
		.pipe(ejs({}))
		.pipe(rename((path)=>{
			path.extname = '.html';
		}))
		.pipe(gulp.dest('src'));
})

//执行
gulp.task('default', ['connect', 'watch']);