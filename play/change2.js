/*
 * author@Mr.He
 * time  @2016-08-23
 * content@修改models文件夹所有文件结构
*/

const fs = require("fs");
const path = require("path");


var tableName = require("./dealstring");
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

// tableArr = [tableArr[0]];


var n = 0;

var Reg = /\{(.*)?(\{)?.*(\})?(.*)?\}/ig;
var Reg2 = /\,|\{|\}|\:/ig;
var Reg3 = /^(\/)(.)*(\*\/)/i;

for(let item of tableArr){
    console.log(item.modelName);

    let content = fs.readFileSync("./models/" + item.modelName + ".js");
    content = content.toString().replace(/\s/ig,"");

    // console.log(n++ , content);

    let note = content.match(Reg3)[0];
        note = note.replace(/\*@/ig, function(){
        return "\r*@";
    });
    let result = content.match(Reg)[0];
    // console.log("========")
    // console.log(n++ , note);
    // console.log(n++ , result);

    result = note + `\r\rmodule.exports={tableName:"${item.tbName}",models:` + result + '}';

    

    result = result.replace(Reg2 , function(str){
        switch(str){
            case ",":
                return ",\r\t";
            case "{":
                return "{\r\t";
            case "}":
                return "\r}";
            case ":":
                return " : ";
        }
    });
    // console.log(n++,result);
    let source = fs.createWriteStream("./modelsCopy/"+item.modelName+".js");
    source.write(result);
    source.end();
}



