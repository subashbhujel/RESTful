var express = require('express'),
    mongoose = require('mongoose'),
    // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
    bodyParser = require('body-parser'); //https://github.com/expressjs/body-parser

var db = mongoose.connect('mongodb://localhost/bookAPI');
var app = express();
var port = process.env.port || 3000;

bookRouter = require('./routes/bookRoutes')();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/books', bookRouter);
// In future if you wish to add more routes, here's how you do it:
//app.use('/api/author', authorRouter);

app.get('/', function(req, res) {
    res.send('Hello World! This is REST API');
});

app.listen(port, function() {
    console.log('Gulp is running on port: ' + port);
});
