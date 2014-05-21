var fs = require('fs');
var handlebars = require('handlebars');
var csv = require('csv-stream');

var options = {delimiter: ';', endLine: '\n', columns: ['rgimm', 'filenet']};
var csvStream = csv.createStream(options);

var constantify = function(string) {
	return string.match(/[A-Z]*[a-z]+/g).join("_").toUpperCase();
}

var t1 = handlebars.compile(fs.readFileSync(__dirname + '/t1.txt', {encoding: 'utf-8'}));
var t2 = handlebars.compile(fs.readFileSync(__dirname + '/t2.txt', {encoding: 'utf-8'}));


var read = function(filename) {

	fs.createReadStream(filename)
		.pipe(csvStream)
		.on('data', function(row) {
			var context = {
				rgimm: row.rgimm, 
				filenet: row.filenet, 
				constant: constantify(row.filenet)
			};
			//console.log(t1(context));
			console.log(t2(context));
		}
	);
}

module.exports = {
	read: read
}
