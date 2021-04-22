'use strict';

const express = require('express');
const cors = require('cors');
const weatherInfo = require('./components/weather');
const movieInfo = require('./components/movies');

require('dotenv').config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', weatherInfo);
app.get('/movies', movieInfo);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
