/* 添加数据 */

const orm = require("orm");
const mysqlConfig = require("../db/mysql.json");
const moment = require("moment");


orm.settings.set("connection.pool", true);
// orm.settings.set("connection.debug", true);


let Person, 
    num = 0 ,  //执行次数
    start,     //开始时间
    length = process.argv[2] || 100;

orm.connect(mysqlConfig, function (err, db) {
    if (err) throw err;
    console.log("ok");
    Person = db.define("hello", {
        "id" : Number,
        "name":String,
        "sex":String,
        "age":Number,
        "createTime":Date
    });


    db.sync(function(err){
        if(err) throw err;

        console.log("hello , created");

        start = +new Date();
        Person.count({} , (err , count)=>{
            console.log("Begin" , count);

            Add(Person);
        });
    });
});


function Data(){
    let obj = {
        "name" : Math.random().toString(32).substr(2,30),
        "sex"  : Math.random() > 0.5 ? "Man" : "Woman",
        "age"  : parseInt(Math.random()*1000),
        "createTime" : moment().format("YYYY-MM-DD h:mm:ss") 
    }

    return obj;
}

function Add(model){
    let arr = [];
    for(var i=0;i<1000;i++){
        arr.push(Data());
    }

    model.create(arr , function(err , result){

        if(num < length){
            Add(model);
        }

        if(num == length - 1){
            console.log("End Time：" , +new Date() - start);
        }

        if(num % 10 == 0){
            console.log("node消耗内存: " ,process.memoryUsage().heapUsed);
            console.log("已插入数据: " , num*1000);
        }

        num++;
    }); 
}



