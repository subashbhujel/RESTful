var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// var Book = require('./models/bookModel.js');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var app = express();
var port = process.env.port || 3000;

bookRouter = require('./routes/bookRoutes')();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/books', bookRouter);
//app.use('/api/author', authorRouter);

app.get('/', function(req, res) {
    res.send('Hello World! This is REST API');
});

app.listen(port, function() {
    console.log('Gulp is running on port: ' + port);
});
