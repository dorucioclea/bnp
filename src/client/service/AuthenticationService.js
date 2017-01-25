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
      console.log('===== AuthenticationService.login response.data', JSON.stringify(response.data));
      console.log(`===== AuthenticationService.login redirect to ${window.simContextPath}${
        response.data.returnTo ||
        (response.data.userInfo.supplierId ? '/dashboard' : '/supplierInformation')
      }`);
      browserHistory.push(`${window.simContextPath}${
        response.data.returnTo ||
        (response.data.userInfo.supplierId ? '/dashboard' : '/supplierInformation')
      }`);
    });
  }

  logout() {
    return axios.get(`${window.simContextPath}/logout`).then(() => {
      browserHistory.push(`${window.simContextPath}/login`);
      this.props.resetCurrentUserInfo();
    }).catch(this.props.httpResponseHandler);
  }

  onboardingDone() {
    return axios.get(`${window.simContextPath}/onboardingDone`).then(() => {
      browserHistory.push(`${window.simContextPath}/dashboard`);
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

  currentUserInfo(forceReload) {
    return axios.get(`${window.simContextPath}/user/currentUserInfo?reload=${!!forceReload}`, {
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
