/* database class*/
var Login = function() {

};

var Database = require("./database").Database;
var db = new Database();
var content = {userName: String, password: String};


Login.prototype.login = function() {
	var logins = db.find('logins');
	return logins;
};

Login.prototype.Register = function(UserName,password) {
	
	db.save('login',content);
	console.log('--------saved-------------');
};

Login.prototype.DeleteUser = function(UserName) {

};




module.exports.Login = Login;