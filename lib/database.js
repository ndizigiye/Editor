/* database class*/

var mongoose = require('mongoose');
mongoose
		.connect('mongodb://ndizigiye:armand11@ds043977.mongolab.com:43977/infosupport');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var schemaName = "";
var modelName = "";
var password = "";

var Database = function(name, contentStyle) {
	schemaName = mongoose.Schema(contentStyle);
	modelName = mongoose.model(name, schemaName);
};

Database.prototype.save = function(content) {

	console.log("database open");
	var documentName = new modelName(content);

	documentName.save(function(err, documentName) {
		if (err)
			console.log(err);
	});
	return modelName;
};

Database.prototype.find = function(username) {

	modelName.find({
		userName : username
	}, function(err, results) {
		
		if (results[0] !== undefined) {
			console.log();
			password = results[0].password;
		}
	});
	
	return password;
};

module.exports.Database = Database;