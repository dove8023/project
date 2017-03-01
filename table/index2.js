const mysql = require("mysql");
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var sleep2 = function(time){
    return new Promise((resolve , reject)=>{
        setTimeout(()=>{
            console.log("go");
            resolve("dddddfdfdff");
        } , time);
    })
}


var start = async (function(){
    var gg = await (sleep2(3000));

    console.log(gg);
});



start();