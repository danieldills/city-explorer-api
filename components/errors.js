'use strict';

function handleErrors (error, response) {
  console.log(error)
  response.status(500).send('Internal Error');
}

module.exports = handleErrors;
