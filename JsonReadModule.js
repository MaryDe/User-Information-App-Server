const fs = require('fs');

exports.JsonReadModule = function (filename, callback) {
	fs.readFile(filename, function(err,data) {
		if(err) {
			throw err;
		}
		var usersData = JSON.parse(data);
		callback(usersData);
	})
}
