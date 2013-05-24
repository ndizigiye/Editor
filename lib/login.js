/* database class*/
var Login = function() {

	var database = require("./lib/database.js").Database;
	var content = 'userName: String, password: String';
	var LoginSchema = database.addSchema(content);
	var LoginModel = database.addModel('login', schema);
	});
	
};

Login.prototype.Login = function(UserName,password) {

};

Login.prototype.Register = function(UserName,password) {
	
	var newLogin = database.addDocument(LoginModel,content);
	database.save(newLogin);
	console.log('saved');

};

Login.prototype.DeleteUser = function(UserName) {

};




module.exports.Login = Login;