/* database class*/
var Login = function() {

};

var Database = require("./database").Database;
var contentStyle = {userName: String, password: String};
var db = new Database('login',contentStyle);


Login.prototype.login = function(provided_password,username) {
	var true_password = db.find(username);
	var exists = "false";
	if(provided_password == true_password){
		exists = "true";
    }

	return exists;
};

Login.prototype.Register = function(UserName,password) {
	
	var content = {userName: UserName, password: password};
	db.save(content);
	console.log('--------saved-------------');
};

Login.prototype.DeleteUser = function(UserName) {

};




module.exports.Login = Login;