function parseError(error, errorServiceName) {
  console.info('Parsing error in service', errorServiceName);

  if (error.code !== 'ECONNREFUSED') {
    return null;
  }

  let errors = {
    status: 503,
    global: `${errorServiceName || error.errorServiceName} microservice is unavailable. Please contact administrator`
  };

  console.error(errors.global);
  return errors;
}

function generateErrorAndSendResponse(err, res, errorServiceName) {
  console.error(`Error occured in ${errorServiceName}`, err);
  if (errorServiceName) {
    // eslint-disable-next-line no-param-reassign
    err.errorServiceName = errorServiceName;
  }
  let errors = parseError(err);
  if (!errors) {
    errors = err;
    if (err.response) {
      errors.global = err.response.data;
      errors.status = err.response.status;
    } else {
      if (err.data) {
        errors.global = err.data.error;
        errors.status = err.status;
      } else {
        errors.global = err.message;
        errors.status = 500;
      }
    }
  }
  console.error(errors.global);
  res.status(errors.status).send(errors);
}

module.exports = {
  parseError: parseError,
  generateErrorAndSendResponse: generateErrorAndSendResponse
};

