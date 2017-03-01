var app = require("./app.js");
var supertest = require("supertest");

var request = supertest(app);

var should  = require("should");

describe("app.js" , function(){
    it("should return {name:2333}" , function(done){
        request.get("/test").end(function(err , resp){
            // res.text.should.equal("{name:2333}");
            resp.body.name.should.equal(2333);
            done(err);
        });
    });

    it("should return yes" , function(done){
        request.get("/api").end(function(err , resp){
            resp.text.should.equal("yes");

            done(err);
        });
    });


    it("should respond with json" , function(done){
        request
        .get("/api2")
        .expect("Content-Type" ,/json/)
        .expect(200 , done);
        // .end(function(err , res){
        //     // if(err) throw err;
        //     console.log(res.body);
        //     console.log("ok");
        //     done(err);
        // });
    });


    it("should return the 11 enter number with json gg:" , function(done){
        let g = '345';
        request.get("/api3?gg="+g).end(function(err , res){
            if(err) throw err;

            res.body.gg.should.equal(g);

            done(err);
        });
    });


    it("should save cookie" , function(done){
        request.get("/cookie")
        .expect("set-cookie" , "cookie=hey; Path=/" , done)/*.
        end(function(err , res){
            if(err) throw err;
            // console.log(res.text);
            done(err);
        });*/
    });

    it("should get the cookie" , function(done){
        request.get("/return").expect("hey" , done);
    });

});