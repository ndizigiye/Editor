/* database class*/
var Login = function() {

};

var Database = require("./database").Database;
var contentStyle = {userName: String, password: String};
var db = new Database('login',contentStyle);


Login.prototype.login = function() {
	var logins = db.find();
	return logins;
};

Login.prototype.Register = function(UserName,password) {
	
	var content = {userName: UserName, password: password};
	db.save(content);
	console.log('--------saved-------------');
};

Login.prototype.DeleteUser = function(UserName) {

};




module.exports.Login = Login;