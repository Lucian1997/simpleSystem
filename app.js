let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session')

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
//引入路由
let loginRegisterRouter = require('./routes/loginRegister/loginRegister');
let adminRouter = require('./routes/admin/admin');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//配置session
app.use(session({
  secret: 'lucian1997',
  resave: true, //强制保存session
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, //设置session的有效期为一周
  },
  saveUninitialized: true //是否保存初始化的session
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//登录注册路由
app.use('/rl', loginRegisterRouter);
//前台路由

//后台路由
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
