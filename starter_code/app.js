require('dotenv').config();

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const favicon = require('serve-favicon');
// const logger = require('morgan');

const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');

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
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// Express View engine setup
// app.use(require('node-sass-middleware')({
//     src: path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     sourceMap: true
// }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.locals.title = 'Express - Generated with IronGenerator';

const index = require('./routes/index');
app.use('/', index);

const movies = require('./routes/movies');
app.use('/', movies);

const movieDetail = require('./routes/movieDetail');
app.use('/', movieDetail);

app.listen(3000, () => {
    console.log("App listening")
})