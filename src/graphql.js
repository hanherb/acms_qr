var mongodb = require('mongodb');
var mongo = require('./mongo-connect');
var {buildSchema} = require('graphql');
var mergeSchema = require('graphql-tools');

var defaultSchema = buildSchema(`
	type Query {
		user(_id: String!): Person,
		users: [Person],
		bio(_id: String!): Bio,
		bios: [Bio]
	},

	type Person {
		_id: String,
	    fullname: String,
	    email: String,
	    role: String,
	    authority: [String]
  	},

  	type Bio {
  		_id: String,
	    fullname: String,
	    email: String,
	    age: String,
	    sex: String,
	    result: String
  	}

  	type Mutation {
		updateUser(email: String!, input: PersonInput): Person,
		createUser(input: PersonInput): Person,
		deleteUser(email: String!): Person,
		createBio(input: BioInput): Bio
	},

	input PersonInput {
		_id: String,
	    fullname: String,
	    email: String,
	    role: String,
	    authority: [String],
	    password: String
  	},

  	input BioInput {
  		_id: String,
	    fullname: String,
	    email: String,
	    age: String,
	    sex: String,
	    result: String
  	}
`);

var schemas = [];
schemas.push(defaultSchema);

exports.schema = mergeSchema.mergeSchemas({
  schemas: schemas
});

var users = [];
mongo.mongoUser("find", {}, function(response) {
	for(var i = 0; i < response.length; i++) {
		response[i]._id = response[i]._id.toString();
		users.push(response[i]);
	}
});

var bios = [];
mongo.mongoBio("find", {}, function(response) {
	for(var i = 0; i < response.length; i++) {
		response[i]._id = response[i]._id.toString();
		bios.push(response[i]);
	}
});

var getUser = function(args) {
	var userId = args._id;
  	for(var i = 0; i < users.length; i++) {
	  	if(userId == users[i]._id) {
	  		return users[i];
	  	}
	}
}

var getUsers = function() {
	return users;
}

var getBio = function(args) {
	var bioId = args._id;
  	for(var i = 0; i < bios.length; i++) {
	  	if(bioId == bios[i]._id) {
	  		return bios[i];
	  	}
	}
}

var getBios = function() {
	return bios;
}

var updateUserFunction = function({email, input}) {
	var userEmail = email;
  	for(var i = 0; i < users.length; i++) {
	  	if(userEmail == users[i].email) {
	  		let id = users[i]._id;
	  		let email = users[i].email;
	  		let fullname = users[i].fullname;
	  		let role = users[i].role;
	  		let authority = users[i].authority;
	  		users[i] = input;
	  		if(users[i]._id == undefined)
	  			users[i]._id = id;
	  		if(users[i].email == undefined)
	  			users[i].email = email;
	  		if(users[i].fullname == undefined)
	  			users[i].fullname = fullname;
	  		if(users[i].role == undefined)
	  			users[i].role = role;
	  		if(users[i].authority == undefined)
	  			users[i].authority = authority;
	  		return input;
	  	}
	}
}

var createUserFunction = function({input}) {
	users.push(input);
	return input;
}

var deleteUserFunction = function({email}) {
	var userEmail = email;
  	for(var i = 0; i < users.length; i++) {
	  	if(userEmail == users[i].email) {
	  		users.splice(i, 1);
	  		return users[i].email;
	  	}
	}
}

var createBioFunction = function({input}) {
	bios.push(input);
	return input;
}

exports.root = {
	user: getUser,
	users: getUsers,
	bio: getBio,
	bios: getBios,

	updateUser: updateUserFunction,
	createUser: createUserFunction,
	deleteUser: deleteUserFunction,
	createBio: createBioFunction
};