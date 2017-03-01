const mysql = require("mysql");
const async = require("async");

async.series({
    one(callback){
        callback(null , 1);
    },
    two(callback){
        callback(null , 2);
    }
} , function(err , result){
    console.log(result);
});

console.log("========");

async.waterfall([
    (callback)=>{
        callback(null , "one" , "two");
    },
    (arg1 , arg2 , callback)=>{
        console.log(arg1, arg2);
        callback(null , "three");
    },
    (arg1 , callback)=>{
        console.log(arg1);
        callback(null , "done");
    }
] , (err , result)=>{
    console.log(result);
});




console.log(await);
