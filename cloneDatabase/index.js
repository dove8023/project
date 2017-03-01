const orm = require("orm");
const dbConfig = require("./db/mysql.json");

var DB;

orm.connect(dbConfig , function(err , db){
    if(err) throw err;

    DB = db;
    console.log("connect mysql ok");


    db.execQuery("show tables" , function(err , data){
        if(err) throw err;

        console.log(data);
    });
});