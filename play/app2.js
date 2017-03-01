const mysql = require("mysql");
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const eventproxy = require("eventproxy");
const config= require("./devconfig2.json");

let NumberArr = ["INT" , "TINYINT" , "SMALLINT" , "MEDIUMINT" , "BIGINT" , "FLOAT" , "DOUBLE" , "DECIMAL"];
let StringArr = ["CHAR" , "VARCHAR" , "BLOB" , "TEXT" , "TINYBLOB" , "TINYTEXT" , "MEDIUMBLOB" , "MEDIUMTEXT" , "LONGBLOB" , "LONGTEXT"];
let DateArr = ["DATE" , "DATETIME" , "TIMESTAMP" , "TIME" , "YEAR"];


let Reg = /[a-zA-Z]*/ig;
let Arr = [];
let tableName = "Tables_in_"+config.database;


function GetModels(config){
    var _this = this;
    this.DB = null;

    return new Promise((resolve , reject)=>{
        async (function(){
            _this.DB = await (_this.openDB());
            let arr = await(_this.doSql());
            _this.DB.end();
            resolve(_this.CreateModule(arr));
        })();
    });
}

GetModels.prototype.openDB = function(config){
    return new Promise((resolve , reject)=>{
        var db = mysql.createConnection(config);
        db.connect(function(){
            console.log("connect ok");
            resolve(db);
        });
    });
}

//return `show full columns from tablename` result.
GetModels.prototype.doSql = function(){
    var _this = this;
    return new Promise((resolve , reject)=>{
        let ep = new eventproxy();
        this.DB.query("show tables" , (err , result)=>{
            if(err) console.error(err);
            for(let table of result){
                var str = "show full columns from "+table[tableName];
                _this.DB.query(str , (err , data)=>{
                    // if(err) console.log(err);

                    if(!data){
                        console.log("error is "+table[tableName]);
                    }else{
                        data.TableName = table[tableName];
                    }

                    console.log(table[tableName]);
                    ep.emit("column" , data);
                });
            }
            ep.after("column" , result.length , (result)=>{
                resolve(result);
            });
        });
    });
}

/* show full columns from tablename , result. */
GetModels.prototype.CreateModule = function(data){

    //每一项便是一个表的数据模型
    let Arr = [];
    for(let table of data){
        let obj = {};
        for(let item of table){
            let type = item.Type.toLocaleUpperCase().match(Reg , "")[0];
            if(NumberArr.indexOf(type) > -1){
                type = Number;
            }else if(StringArr.indexOf(type) > -1){
                type = String;
            }else if(DateArr.indexOf(type) > -1){
                type = Date;
            }else{
                console.log("Cannot recongnize this type : " , type , table.tableName);
            }
            if(item.Key == "PRI"){
                obj[item.Field] = {
                    type: 'number', key: true
                };
            }else{
                obj[item.Field] = type;
            }
        }
        Arr.push(obj);
    }

    return Arr;
}


module.exports = GetModels;

