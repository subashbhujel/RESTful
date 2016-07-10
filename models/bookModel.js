var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookModel = new Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false }
});

// 'Book' is just an alias. You can name it anything. 
module.exports = mongoose.model('Book', bookModel);
