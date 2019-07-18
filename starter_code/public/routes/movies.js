const express = require('express');
const router = express.Router();
// const app = express();
const Movie = require('../models/moviesModel')

router.get('/movies', (req, res, next) => {
    Movie.find({})
        .then(movies => {
            console.log(movies);
            res.render('movies', { movies });
        })
})

module.exports = router;