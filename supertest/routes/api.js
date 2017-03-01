/*
 * author @ Mr.He
 * time   @ 20160824
*/
var cookieParser = require("cookie-parser");
var express = require("express");
var Router = express.Router();
function Api(Router){
    Router.get("/api" , function(req , res , next){
        res.end("yes");
    });

    Router.get("/api2" , function(req , res , next){
        res.status(200).json({name:"tobi"});
    });

    Router.get("/api3" , function(req , res , next){
        res.status(200).json({"gg" : req.query.gg});
    });

    Router.get("/cookie" , function(req , res , next){
        res.cookie("cookie" , "hey");
        console.log(res.cookie.cookie);
        res.send();
    });

    Router.get("/return" , function(req , res , next){
        // console.log(req.cookies);
        if(req.cookies.cookie) res.send(req.cookies.cookie);
        else res.send(":(((");
    });

    return Router;
}

module.exports = Api(Router);