"use strict"

var mongoose = require('mongoose');

var notebooksSchema = mongoose.Schema({
    title: String,
    description: String,
    images: String,
    price: Number
});




var Notebooks = mongoose.model('notebooks', notebooksSchema);
module.exports = Notebooks;