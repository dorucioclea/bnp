import ajaxRequest from 'superagent';

export default userInfo => ajaxRequest.
  post('user/createUser').
  send(userInfo).
  then(res => ({
    status: res.status,
    message: res.body || res.text
  })).
  catch(err => Promise.reject(
    err &&
    err.response &&
    err.response.body &&
    err.response.body.errors
  ));

