const mysql = require("mysql");
const async = require("async");
// const config= require("./devconfig.json");
const config= require("./mydb.json");
let NumberArr = ["INT" , "TINYINT" , "SMALLINT" , "MEDIUMINT" , "BIGINT" , "FLOAT" , "DOUBLE" , "DECIMAL"];
let StringArr = ["CHAR" , "VARCHAR" , "BLOB" , "TEXT" , "TINYBLOB" , "TINYTEXT" , "MEDIUMBLOB" , "MEDIUMTEXT" , "LONGBLOB" , "LONGTEXT"];
let DateArr = ["DATE" , "DATETIME" , "TIMESTAMP" , "TIME" , "YEAR"];
let Reg = /[a-zA-Z]*/ig;
let Arr = [];

let tableName = "Tables_in_play";

var db = mysql.createConnection(config);

db.connect(function(){
    console.log("connect ok");
});

db.query("show tables" , (err , result)=>{
    if(err) console.error(err);

    console.log(result.length);
    // return;
    for(let table of result){
        
        var str = "show full columns from "+table[tableName];
        db.query(str , (err , data)=>{
            if(err) console.log(err);

            console.log("==========");
            console.log(table[tableName]);
            CreateModule(data);

            console.log(Arr);
        });
    }
});


/* show full columns from tablename , result. */
function CreateModule(data){
    var obj = {};
    for(let item of data){
        let type = item.Type.toLocaleUpperCase().match(Reg , "")[0];
        if(NumberArr.indexOf(type) > -1){
            type = Number;
        }else if(StringArr.indexOf(type) > -1){
            type = String;
        }else if(DateArr.indexOf(type) > -1){
            type = Date;
        }else{
            console.log("Cannot recongnize this type : " , type);
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



setTimeout(function(){
    db.end();
} , 3000);

