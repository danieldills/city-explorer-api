'use strict';

const express = require('express');
const cors = require('cors');
const weatherInfo = require('./components/weather');
const movieInfo = require('./components/movies');

require('dotenv').config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

// Pull movie and weather info from corresponding components
app.get('/weather', weatherInfo);
app.get('/movies', movieInfo);

function handleErrors (error, response) {
  console.log(error)
  response.status(500).send('Internal Error');
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
