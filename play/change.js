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

console.log(123,arr[0])

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
console.log(tableArr[0]);


/*for(let item of tableArr){
    let content = fs.readFileSync("./models/" + item.modelName + ".js");
    content = content.toString();

    content += "\ntableName : " + item.tbName;

    let source = fs.createWriteStream("./modelsCopy/"+item.modelName+".js");
    source.write(content);
}*/


/* 获取大括号中的内容 */
var ss = fs.readFileSync("./models/"+tableArr[0].modelName+".js");
ss = ss.toString();
ss = ss.replace(/(\s)/ig,"");
// ss += "\ntableName : " + tableArr[0].tbName;

console.log(ss);


console.log("===========");


var Reg = /\{(.*)?\{.*\}(.*)?\}/ig;
var Reg2 = /\,|\{|\}|\:/ig;
var Reg3 = /^(\/)(.)*(\/)/i;
// var str = "/dfdfdfdf/";
// console.log(str.match(Reg2));
var note = ss.match(Reg3)[0];
note = note.replace(/\*@/ig , function(item){
    return "\r*@";
});

console.log(note);

var result = ss.match(Reg)[0];
result = note + `\r\rmodule.exports={tableName:"test",models:` + result + '}';
result = result.replace(Reg2 , function(item){
    switch(item){
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
console.log(result);




// var gg = ss.match(Reg);
// console.log(gg);

// console.log("===========\n\n")

// var gg = require("./models/"+tableArr[0].modelName+".js");
// console.log(JSON.stringify(gg));

// var gs = {};
// for(var i in gg){
//     // console.log(i);
//     switch(gg[i]){
//         case Date:
//             gs[i] = 'Date';
//             break;
//         case Number:
//             gs[i] = 'Number';
//             break;
//         case String:
//             gs[i] = 'String';
//             break;
//         default:
//             gs[i] = gg[i];
//     }
//     // console.log(gg[i])
// }

// console.log(JSON.stringify(gs));

// console.log(gg.new_users == Number);








// for(var i in gg){
//     console.log(i , typeof gg[i] == "function")

// }

// console.log(JSON.stringify(gg));

// console.log(tableArr[0].modelName , JSON.stringify(gg));


var source = fs.createWriteStream("./hello.js");
// var resource=fs.createReadStream("./models/"+tableArr[0].modelName+".js");

// var test;
// resource.on("data" , function(chunk){
    // test = chunk.toString();
    // console.log(test);
//     console.log(test.match(Reg));

    source.write(result);
    source.end();
// });


// console.log(test);



