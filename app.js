var express = require('express'),
    mongoose = require('mongoose'),
    Book = require('./models/bookModel.js'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var app = express();
var port = process.env.port || 3000;
var bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function(req, res) {
        var book = new Book(req.body);
        book.save(); // Saves to the MongoDB
        res.status(201).send(book); // 201 = Created
    })
    .get(function(req, res) {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query;
        }

        Book.find(query, function(err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
        // var responseJson = {Hello: "This is from GET API"};
        // res.json(responseJson);
    });

bookRouter.route('/Books/:bookId')
    .get(function(req, res) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        });
    })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);

app.get('/', function(req, res) {
    res.send('Hello World! This is REST API');
});

app.listen(port, function() {
    console.log('Gulp is running on port: ' + port);
});
