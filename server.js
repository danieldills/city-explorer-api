'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('hello!');
});

  app.get('/weather', (request, response) => {
    try {
    const dailyForecasts = weatherData.data.map(day => new Forecast(day));
    response.send(dailyForecasts);
  } catch (error) {
    handleErrors(error, response);
  }
});

function Forecast(obj) {
  this.date = obj.datetime;
  this.description = obj.weather.description;
}

function handleErrors (error, response) {
  response.status(500).send('Internal Error');
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
