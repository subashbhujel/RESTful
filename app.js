var express = require('express'),
	mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var app = express();
var port = process.env.port || 3000;
var bookRouter = express.Router();

bookRouter.route('/Books')
	.get(function(req, res){
		var responseJson = {Hello: "This is from GET API"};
		res.json(responseJson);
	});

app.use('/api', bookRouter);

app.get('/', function(req, res){
	res.send('Hello World! This is REST API');
});

app.listen(port, function(){
	console.log('Gulp is running on port: '+port);
});