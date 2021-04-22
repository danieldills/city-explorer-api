'use strict';

const superagent = require('superagent');

function movieInfo (request, response) {
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
};

function Movies(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.poster_path = movie.poster_path;
  this.release_date = movie.release_date;
}

module.exports = movieInfo;
