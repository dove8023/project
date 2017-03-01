var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require("cookie-session");
const dataModule = require("./dataModule");
const redis = require("redis");
const redisConfig = require("./db/redis.json");


/*var client = redis.createClient(redisConfig);

client.on("connect" , function(err){
  if(err) throw err;
  console.log("redis connect");
});*/



var app = express();

process.env.PORT = 3001;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("trust proxy" , 1);  //trust first proxy
app.use(cookieSession({
  "name" : "SessionId",
  "secret": "thesecret" ,   //通过hash计算的一个值，放倒cookie中
  "cookie":{
    "maxAge" : 20000,
    "httpOnly":true,        //不允许客户端修改这个值
  },
  "resave":false,          //session没有修改，不要保存session的值
  "saveUninitialized": true,
  // "store" : new RedisStore(redisConfig)
}));

new dataModule(app);

app.use(function(req , res , next){
  /*console.log(req.session);
  console.log(req.sessionOptions);
  console.log(req.cookies.SessionId);*/
  console.log("yes");
  next();
})


var Router = express.Router();
var routes = require('./routes/index');
var loginRoutes = require('./routes/login');


app.use(routes(Router));
app.use(loginRoutes(Router));









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
