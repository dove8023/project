/**
 * @author fuqiang
 * @fileoverview orm for dataabase
 * @date 20151201
 */

const config = {
    "user": "tester",
    "password": "Test_usEr",
    "host": "atlas01.test.gomeplus.com",
    "port":"8806",
    "database" : "dataplatform"
};
const mysql = {
    "username": "tester",
    "pwd": "Test_usEr",
    "host": "atlas01.test.gomeplus.com",
    "port":"8806",
    "database" : "dataplatform"
};

var orm = require('orm'),
    GetModels = require("./app2");

var GetModelsE = new GetModels(config);



function connect(app) {
    app.use(orm.express('mysql://' + mysql.username + ':' + mysql.pwd + '@' + mysql.host + '/' + mysql.database + '?timezone=CST', {
        define: function(db, models, next) {
            db.settings.set('instance.cache', false);
            db.settings.set('instance.autoFetch', true);
           
            GetModelsE.then(function(arr){
                for(let item of arr){
                    models[item.]
                }
            });

            models.db1 = db;
            next();
        }
    }));
    /*app.use(orm.express('mysql://' + rebate.username + ':' + rebate.pwd + '@' + rebate.host + '/' + rebate.database + '?timezone=CST', {
        define: function(db, models, next) {
            db.settings.set('instance.cache', false);
            db.settings.set('instance.autoFetch', true);
            models.TypeFlow = db.define("t_rebate_type_flow", obj.TypeFlow);
            models.db2 = db;
            next();
        }
    }));*/
};

module.exports = connect;
