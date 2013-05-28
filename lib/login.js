/* database class*/

var Database = require("./database").Database;
var contentStyle = {userName: String, password: String,email: String};
var db = new Database('login',contentStyle);
var json = require("./security/credentials.json");

var Login = function() {

};

Login.prototype.login = function(provided_password,username) {
	var true_password = db.find(username);
	var exists = "false";
	
	if(provided_password == true_password && provided_password != ""){
		exists = "true";
    }

	return exists;
};

Login.prototype.simple_login = function(provided_username,provided_password) {
	
	var username = json.username;
	var password = json.password;
	
	if(provided_username == username && provided_password == password){
		
		return true;
	}

		return false;

};

Login.prototype.Register = function(UserName,password,email) {
	
	var user_exists = db.exists(UserName);
	
	if(user_exists){
		console.log(user_exists+" "+UserName+" "+"bestaat_al");
		return false;
	}
	var content = {userName: UserName, password: password, email: email };
	db.save(content);
	console.log('--------saved-------------');
	
	return true;
};

Login.prototype.DeleteUser = function(UserName) {

};




module.exports.Login = Login;