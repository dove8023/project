/*
 * play
*/
const orm   = require("orm");
const mysql = require("../db/mysql.json").dev;
const fs    = require("fs");
const path  = require("path");

var tableName = require("../dealstring");
var tableArr = [];    //保存整理好的模型名和表名
var arr = tableName.match(/\(.*\)/ig);

for(var item of arr){
    item = item.match(/([0-9a-z_])*/ig);
    var oneItem = {};
    for(var value of item){
        if(value && value != 'obj'){
            if(oneItem.tbName){
                oneItem.modelName = value;
            }else{
                oneItem.tbName = value;
            }
        }
    }
    tableArr.push(oneItem);
}

var files = fs.readdirSync(__dirname);
var obj = {};   //保存所有表结构模型
for(var k of files){
    if(k !== "mysql.js" && k !== "testmysql.js" && k.includes(".js")){
        var file = k.match(/(.*).js/);
        obj[file[1]] = require("./"+file[0]);
    }
}

function connect(app){
    app.use(orm.express("mysql://"+mysql.username+":"+mysql.pwd + "@" + mysql.host + "/" + mysql.database , {
        define : function(db, models , next){
            for(item of tableArr){
                models[item.modelName] = db.define(item.tbName , obj[item.modelName]);
            }
            models.db1 = db;
            next();
        }
    }))
}


module.exports = {
    "connect" : connect,
    "tableArr": tableArr
};