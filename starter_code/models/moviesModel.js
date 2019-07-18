const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = mongoose.model('movies', new Schema({
    title: String,
    director: String,
    description: String,
    showtimes: Array,
    stars: Array,
    image: String,
}), 'movies');

module.exports = Movie;