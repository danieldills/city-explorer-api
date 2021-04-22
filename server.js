'use strict';

const superagent = require('superagent');
require('dotenv').config();
const express = require('express');

const cors = require('cors');
const { response } = require('express');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

console.log('Hello');

app.get('/weather', (request, response) => {
  console.log(request.query)
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
  .query({
    key: process.env.WEATHER_API_KEY,
    units: 'I',
    lat: request.query.lat,
    lon: request.query.lon
  })
  .then(weatherData => {
    console.log(weatherData.body)
    response.send(weatherData.body.data.map(day => new Forecast(day)));
  })
  .catch (error => handleErrors(error.message));
});

function Forecast(obj) {
  this.date = obj.datetime;
  this.description = obj.weather.description;
}

app.get('/movies', (request, response) => {
  console.log(process.env.MOVIE_API_KEY);
  superagent.get('https://api.themoviedb.org/3/search/movie')
  .query({
    api_key: process.env.MOVIE_API_KEY,
    query: request.query.city
  })
  .then(movieData => {
    let map = movieData.body.results.map(movie => new Movies(movie))
    response.send(map);
  })
  .catch(error => handleErrors(error, response));
});

function Movies(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.poster_path = movie.poster_path;
  this.release_date = movie.release_date;
}

function handleErrors (error, response) {
  console.log(error)
  response.status(500).send('Internal Error');
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
