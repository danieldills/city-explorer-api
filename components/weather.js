'use strict';

const superagent = require('superagent');
const handleErrors = require('./errors');

function weatherInfo (request, response) {
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
};

function Forecast(obj) {
  this.date = obj.datetime;
  this.description = obj.weather.description;
}

module.exports = weatherInfo
