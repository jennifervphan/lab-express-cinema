const express = require('express');
const router = express.Router();
const Movie = require('../models/moviesModel')

router.get('/movies/:id', (req, res, next) => {
    let idNum = req.params.id;
    Movie.find({ _id: idNum })
        .then((movieChosen) => {
            res.render('movieDetail', { movieChosen });
        })
})

module.exports = router;