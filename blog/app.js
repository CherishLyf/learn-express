// 生成一个 express 实例
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 引入 router
var routes = require('./routes/index');
var settings = require('./settings')
var flash = require("connect-flash")
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

var app = express();

app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,     // cookie name
  cookie: { maxAge: 1000 * 60 * 60* 24 * 30 },    // 30 days
  store: new MongoStore({
    // db: settings.db,
    // host: settings.host,
    // port: settings.port
    url: "mongodb://" + settings.host + "/" + settings.db
  })
}))

// 设置 views 文件夹作为存放视图模板文件的目录，
// __direname 为全局变量， 储存当前脚本所在目录
app.set('views', path.join(__dirname, 'views'));

// 指定模板引擎为 ejs
app.set('view engine', 'ejs');
app.use(flash())

app.use(favicon());

// 加载日志中间件
app.use(logger('dev'));

// 加载解析 json 的中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// 加载 cookies 中间件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app)

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
