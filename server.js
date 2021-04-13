const { response } = require('express');
const express = require('express');
require('dotenv').config();

const weatherData = require('./data/weather.json');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('hello!');
});

app.get('/weather', (request, response) => {
  let array = weatherData.data.map(day => {
    return new Forecast(day)
  });
  response.json(array);
});

function Forecast(obj) {
  this.date = obj.datetime;
  this.description = obj.weather.description;
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
