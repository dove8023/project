/*
 * redis using.
*/

var redis = require("redis"),
	client;

client =redis.createClient(6379,"localhost",{});

client.on("error" , function(err){
	console.log("Error " + err);
});

client.on("connect" , function(err){
	console.log("connect redis");
});

client.keys("*" , function(err , keys){
	if(err) throw err;

	console.log(keys);

	// client.
})