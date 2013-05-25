/* User class*/
var _name = "";
var _id = "";
var _time = "";

var User = function (name, id, time) {

	_name = name;
	_id = id;
	_time = time;
};

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
User.prototype.getName = function() {
	return _name;
};
User.prototype.getId = function() {
	return _id;
};

User.prototype.getTime = function() {
	return _time;
};

module.exports.User = User;