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



for(let item of tableArr){
    console.log(item.modelName);

    let content = fs.readFileSync("./models/" + item.modelName + ".js");
    content = content.toString();
   
    let str = `\r\rmodule.exports={\r\tmodels : ,\r\ttableName : "${item.tbName}"\r};`;

    content += str;

    let source = fs.createWriteStream("./modelsCopy/"+item.modelName+".js");
    source.write(content);
    source.end();
}



