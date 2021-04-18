'use strict';

const superagent = require('superagent');
require('dotenv').config();
const express = require('express');

// const cors = require('cors');
const app = express();

// const weatherData = require('./data/weather.json');


// app.use(cors());

const PORT = process.env.PORT || 3001;

console.log('Hello');

app.get('/weather', (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
  .query({
    key: process.env.WEATHERBIT_API_KEY,
    units: 'I',
    lat: request.query.lat,
    lon: request.query.lon
  })
  .then(weatherData => {
    response.json(weatherData.body.data.map(info => (
    {date: info.datetime,
      description: info.weather.description})));
  });
});

// function Forecast(obj) {
//   this.date = obj.datetime;
//   this.description = obj.weather.description;
// }

// function handleErrors (error, response) {
//   response.status(500).send('Internal Error');
// }

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
