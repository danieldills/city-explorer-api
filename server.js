'use strict';

const superagent = require('superagent');
require('dotenv').config();
const express = require('express');

const cors = require('cors');
const { response } = require('express');
const app = express();

// const weatherData = require('./data/weather.json');


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
    response.send(weatherData.body.data.map(info => (
    {date: info.datetime,
      description: info.weather.description})));
  })
  .catch (error => {
    console.log(error.message);
  })
});

app.get('/movies', (request, response) => {
  console.log(request.query);
  superagent.get('https://api.themoviedb.org/3/search/movie?api_key=165ea84c5dfa2c79e3f41755b4b4a1b2')
})

// function Forecast(obj) {
//   this.date = obj.datetime;
//   this.description = obj.weather.description;
// }

// function handleErrors (error, response) {
//   response.status(500).send('Internal Error');
// }

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
