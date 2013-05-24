/* database class*/
var Database = function() {

};

var mongoose = require('mongoose');
mongoose.connect('mongodb://ndizigiye:armand11@ds043977.mongolab.com:43977/infosupport');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

Database.prototype.save = function(name,content) {
		
		console.log("database open");

		var schemaName = mongoose.Schema(content);
		var modelName = mongoose.model(name, schemaName);
		var documentName = modelName(content);
		
		documentName.save(function(err, documentName) {
			if (err)
				console.log(err);
		});
		//console.log(schemaName);
};

Database.prototype.find = function(modelName) {

		modelName.find(function(err, results) {
			if (err)
				console.log(err);

			return results;
		});	
};


module.exports.Database = Database;