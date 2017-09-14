import browserHistory from 'react-router/lib/browserHistory';

function httpResponseHandler({ status, message }) {
  if (status === 401) {
    console.log('You not authenticated to access this resource');
    browserHistory.push('/login');
  } else if (status === 403) {
    console.log('You haven\'t permissions to access this resource');
    browserHistory.push('/accessDenied');
  } else {
    throw message;
  }
}

export default httpResponseHandler;
