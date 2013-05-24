/* database class*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://ndizigiye:armand11@ds043977.mongolab.com:43977/infosupport');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var schemaName = "";
var modelName = "";

var Database = function(name,contentStyle) {
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

Database.prototype.find = function() {

		modelName.find(function(err, results) {
			if (err) console.log(err);
			console.log(results)
			for(var i in results){
				
			}
			return results;
		});	
};


module.exports.Database = Database;