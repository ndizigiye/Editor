/* database class*/
var Login = function() {

};

var Database = require("./database").Database;
var db = new Database();
var content = {userName: String, password: String};
var LoginSchema = db.addSchema(content);
var LoginModel = db.addModel('login', LoginSchema);


Login.prototype.Login = function(UserName,password) {

};

Login.prototype.Register = function(UserName,password) {
	
	var newLogin = db.addDocument(LoginModel,content);
	db.save(newLogin);
	console.log('--------saved-------------');

};

Login.prototype.DeleteUser = function(UserName) {

};




module.exports.Login = Login;