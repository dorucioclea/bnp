function parseError(error) {
  let errors = {};
  if ((error.name === 'SequelizeConnectionRefusedError') ||
    (error.data && error.data.errors.indexOf('ECONNREFUSED' >= 0))) {
    errors.global = `Application database is unavailable. Please contact administrator.`;
    console.error(errors.global);
    errors.status = 503;
  }
  return (Object.keys(errors).length > 0) ? errors : null;
}

function generateErrorAndSendResponse(err, res) {
  let errors = parseError(err);
  if (!errors) {
    errors = err;
    errors.global = err.response ? err.response.data : err.message;
    errors.status = err.response ? err.response.status : 500;
  }
  console.error(errors.global);
  res.status(errors.status).send(errors);
}

module.exports = {
  parseError: parseError,
  generateErrorAndSendResponse: generateErrorAndSendResponse
};

