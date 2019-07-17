require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const Schema = mongoose.Schema;

const Movie = mongoose.model('movies', new Schema({
    title: String,
    director: String,
    description: String,
    showtimes: Array,
    stars: Array,
    image: String,
}), "movies");

mongoose
    .connect('mongodb://localhost/yourdatabase', { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
app.use('/', index);

app.get('/movies', function(req, res) {
    Movie.find()
        .then(movies => {
            console.log(movies);
            res.render('movies', { movies });
        })
})

app.get('/movies/:id', function(req, res) {
    let idNum = req.params.id;
    Movie.find({ _id: idNum })
        .then((movieChosen) => {
            console.log(movieChosen[0].title);
            let asdf = movieChosen[0]
            console.log(Object.keys(movieChosen[0]));
            res.render('movieDetail', { movieChosen });
        })
})

app.listen(3000, () => {
    console.log("App listening")
})

module.exports = app;