import axios from 'axios';
import browserHistory from 'react-router/lib/browserHistory';

export default class AuthenticationService {

  constructor(props) {
    this.props = props;
  }

  isAuthenticated() {
    return axios.get(`${window.simContextPath}/isAuthenticated`);
  }

  login(user) {
    return axios.post(`${window.simContextPath}/login`, user).then(response => {
      if (response.data.returnTo) {
        browserHistory.push(`${window.simContextPath}${response.data.returnTo}`);
      } else {
        browserHistory.push(`${window.simContextPath}/supplierInformation`);
      }
    });
  }

  logout() {
    return axios.get(`${window.simContextPath}/logout`).then(() => {
      browserHistory.push(`${window.simContextPath}/login`);
    }).catch(this.props.httpResponseHandler);
  }

  verifyUser(verificationToken) {
    return axios.post(`${window.simContextPath}/user/verify`,
      JSON.stringify({
        verificationToken
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  currentUserInfo() {
    return axios.get(`${window.simContextPath}/user/currentUserInfo`, {
      headers: {
        Accept: 'application/json'
      }
    });
  }

  applicationUrl() {
    return axios.get(`${window.simContextPath}/applicationConfig/url`, {
      headers: {
        Accept: 'application/json'
      }
    });
  }

  formatPatterns() {
    return axios.get(`${window.simContextPath}/applicationConfig/formatPatterns`, {
      headers: {
        Accept: 'application/json'
      }
    });
  }

  defaultLocale() {
    return axios.get(`${window.simContextPath}/applicationConfig/defaultLocale`, {
      headers: {
        Accept: 'application/json'
      }
    });
  }
}
