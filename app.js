var express = require('express');//...........
var path = require('path');  //路径管理
var favicon = require('serve-favicon');//图标
var logger = require('morgan');//日志中间件
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//...........



var session=require('express-session');
var MongoStore=require('connect-mongo')(session);

var mongoose=require('mongoose');
var dbUrl='mongodb://localhost/webData';
mongoose.connect(dbUrl);
mongoose.Promise = global.Promise = require('bluebird');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {console.log('数据库连接成功！')});

var app = express();//...........

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret:'webData',
	store:new MongoStore({
		url:dbUrl,
	    collection:'sessions'
	})
}));



app.locals.moment=require('moment');



require('./route/route')(app);//.........

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('web is start!'+'3000');  // 为后台输出一个日志

module.exports = app;
