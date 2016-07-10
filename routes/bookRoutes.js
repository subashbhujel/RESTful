// .  = This location
//.. = Up a directory

var express = require('express'),
    Book = require('../models/bookModel.js');

var routes = function() {
    var bookRouter = express.Router();

    bookRouter.route('/')
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
        });

    // **Middleware**
    // This is a way to separate repeated function between get/post/put/patch at one place.
    // Here it works for route that uses bookId. 
    // Next = passes on to 'next' thing to be done. In this case it will move on to Get or Put.
    // If we had more middleware, it would have moved on to next middleware.
    bookRouter.use('/:bookId', function(req, res, next) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                // Adding book to req=request so it's accessible through req keyword.
                req.book = book;
                // Moving on contro to next middleware or get/put in this case since we don't have any more middleware.
                next();
            } else {
                res.status(404).send('No book found.');
            }
        });
    });

    bookRouter.route('/:bookId')
        .get(function(req, res) {
            // If error or book not found, middleware will catch it already. It will reach here *if* it finds the book!
            res.json(req.book);
        })
        .put(function(req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;

            // Saves the updated Book
            req.book.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    // returns the book object back.
                    res.json(req.book);
                }
            });
        })
        .patch(function(req, res) {
            // we do not want to update the ID
            if (req.body._id) {
                delete req.body._id;
            }

            // Loop through each element in the body and update corresponding records.
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }

            // Save the changes
            req.book.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .delete(function(req, res) {
            req.book.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send('Removed!');
                }
            })
        });

    return bookRouter;
};

module.exports = routes;
