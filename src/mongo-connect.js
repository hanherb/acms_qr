var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
// var mongourl = 'mongodb://localhost:27017/';
var TortoiseDB = require('tortoisedb');

const torApp = new TortoiseDB({
	name: 'qrcode',
	port: 4000,
	mongoURI: 'mongodb://localhost:27017',
	batchLimit: 1000
});
torApp.start();

exports.mongoUser = function(action, query, callback) {
	MongoClient.connect(torApp.mongoShell._url, function(err, db) {
		if(err) {
			console.log("Error: ", err);
		}
		else {
			var dbo = db.db("qrcode");

			if(action == "find") {
				console.log("Connection Established. Action="+action);
				dbo.collection("user").find({}).toArray(function(err, result) {
					if(callback)
						return callback(result);
			    	db.close();
			  	});
			}

			else if(action == "insert") {
				console.log("Connection Established. Action="+action);
				dbo.collection("user").insert(query, function(err, result) {
					if(callback)
						return callback(result);
			    	db.close();
			  	});
			}

			else if(action == "update") {
				console.log("Connection Established. Action="+action);
				dbo.collection("user").update(query[0], query[1], function(err, result) {
					if(callback)
						return callback(result);
					db.close();
				});
			}

			else if(action == "delete") {
				console.log("Connection Established. Action="+action);
				dbo.collection("user").deleteOne(query, function(err, result) {
					if(callback)
						return callback(result);
			    	db.close();
			  	});			
		  	}

			else if(action == "find-query") {
				console.log("Connection Established. Action="+action);
				dbo.collection("user").find(query).toArray(function(err, result) {
					if(callback)
						return callback(result);
			    	db.close();
			  	});
			}
			else if(action == "session") {
				console.log("Connection Established. Action="+action);
				dbo.collection("user").find(query).toArray(function(err, result) {
					if(callback)
						return callback(result);
			    	db.close();
			  	});
			}
		}
	});
}

exports.mongoBio = function(action, query, callback) {
	MongoClient.connect(torApp.mongoShell._url, function(err, db) {
		if(err) {
			console.log("Error: ", err);
		}
		else {
			var dbo = db.db("qrcode");

			if(action == "find") {
				console.log("Connection Established. Action="+action);
				dbo.collection("bio").find({}).toArray(function(err, result) {
					if(callback)
						return callback(result);
			    	db.close();
			  	});
			}

			else if(action == "insert") {
				console.log("Connection Established. Action="+action);
				dbo.collection("bio").insert(query, function(err, result) {
					if(callback)
						return callback(result);
			    	db.close();
			  	});
			}

			else if(action == "update") {
				console.log("Connection Established. Action="+action);
				dbo.collection("bio").update(query[0], query[1], function(err, result) {
					if(callback)
						return callback(result);
					db.close();
				});
			}

			else if(action == "delete") {
				console.log("Connection Established. Action="+action);
				dbo.collection("bio").deleteOne(query, function(err, result) {
					if(callback)
						return callback(result);
			    	db.close();
			  	});			
		  	}
		}
	});
}