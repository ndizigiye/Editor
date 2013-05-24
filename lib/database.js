/* database class*/
var Database = function() {

	var mongoose = require('mongoose');
	mongoose.connect('mongodb://ndizigiye:armand11@ds043977.mongolab.com:43977/infosupport');
};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
	
	Database.prototype.addSchema = function(schemaName,content) {

		schemaName = new Schema({
				content
			});
		
		return schemaName;
	};
	
	Database.prototype.addModel = function(modelName,modelAlias,schemaName) {

		modelName =  mongoose.model(modelAlias, kittySchema);
		
		return modelName;
	};
	
	Database.prototype.addDocument = function(documentName,Name,modelName,content) {

		documentName =  new modelName(content);
		
		return documentName;
	};
	
	Database.prototype.save = function(documentName) {

		documentName.save(function (err, documentName) {
			  if (err) console.log(err);
			});
	};
	
	Database.prototype.find = function(modelName) {

		modelName.find(function (err, results) {
			  if (err) console.log(err);
			 
			  return results;
			})
	};
	
	

});

module.exports.Database = Database;