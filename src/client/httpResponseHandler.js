import browserHistory from 'react-router/lib/browserHistory';

function httpResponseHandler(response) {
  if (response.status === 401) {
    console.log('You not authenticated to access this resource');
    browserHistory.push(`${window.simContextPath}/login`);
  } else if (response.status === 403) {
    console.log('You haven\'t permissions to access this resource');
    browserHistory.push(`${window.simContextPath}/accessDenied`);
  } else {
    throw response.data;
  }
}

export default httpResponseHandler;
