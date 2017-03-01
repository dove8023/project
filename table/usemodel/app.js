const fs = require("fs");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var orm = require("orm");
// var GetModule = require("./hello.json");
// var config = require("../mydb.json");
/*const mysql = {
    "username": "root",
    "pwd": "hexisen123",
    "host": "localhost",
    "port":"3306",
    "database" : "play"
};*/

const mysql = require("./devconfig2.json");


var data = fs.readFileSync("./hello.json");

data = data.toString();
data = JSON.parse(data);

for(let item of data){
  for(let key in item.Columns){
    switch(item.Columns[key]){
      case "String":
        item.Columns[key] = String;
        break;
      case "Date":
        item.Columns[key] = Date;
        break;
      default:
        item.Columns[key] = Number;
    }
  }
}



orm.settings.set("connection.pool", true);
orm.settings.set("connection.debug", true);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(orm.express('mysql://' + mysql.user + ':' + mysql.password + '@' + mysql.host + '/' + mysql.database + '?timezone=CST', {
        define : function(db , models , next){
      db.settings.set('instance.cache', false);
      db.settings.set('instance.autoFetch', true);

      /*for(let item of data){
        var name = item.TableName;
        models[name] = db.define(name , item.Columns);
      }*/

      models.channel = db.define("channel" , {
        channel_id : {type:"number" , key : true},
        channel_type : String,
        channel_type_code : String,
        channel_name : String,
        channel_code : String,
        channel_ex : String,
        create_time : Date,
        update_time : Date,
        desc : String
      })

      console.log("gg");
      next();
    }
})); 

app.use('/', routes);
app.use('/users', users);



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
