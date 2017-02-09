import ajaxRequest from 'superagent';
import browserHistory from 'react-router/lib/browserHistory';
import Promise from 'promise';

export default class AuthenticationService {

  constructor({ httpResponseHandler, resetCurrentUserInfo }) {
    this.httpResponseHandler = httpResponseHandler;
    this.resetCurrentUserInfo = resetCurrentUserInfo;
  }

  isAuthenticated = () => ajaxRequest.
    get(`${window.simContextPath}/isAuthenticated`).
    then(res => res.body.username);

  login = user => ajaxRequest.
    post(`${window.simContextPath}/login`).
    send(user).
    then(res => browserHistory.push(
      `${
        window.simContextPath
      }${
        res.body.returnTo ||
        (res.body.userInfo.supplierId ? '/dashboard' : '/supplierInformation')
      }`
    )).
    catch(err => Promise.reject(err.status));

  logout() {
    return ajaxRequest.
      get(`${window.simContextPath}/logout`).
      then(() => this.resetCurrentUserInfo()).
      catch(err => this.httpResponseHandler({
        status: err.status,
        message: err.response.body || err.response.text
      }));
  }

  onboardingDone() {
    return ajaxRequest.
      get(`${window.simContextPath}/onboardingDone`).
      then(() => browserHistory.push(`${window.simContextPath}/dashboard`)).
      catch(err => this.httpResponseHandler({
        status: err.status,
        message: err.response.body || err.response.text
      }));
  }

  verifyUser = verificationToken => ajaxRequest.
    post(`${window.simContextPath}/user/verify`).
    send({ verificationToken });

  currentUserInfo = forceReload => ajaxRequest.
    get(`${window.simContextPath}/user/currentUserInfo`).
    query({ reload: !!forceReload }).
    accept('json').
    then(res => res.body && res.body.currentUserInfo || {});

  applicationUrl = () => ajaxRequest.
    get(`${window.simContextPath}/applicationConfig/url`).
    then(res => res.text);

  formatPatterns = () => ajaxRequest.
    get(`${window.simContextPath}/applicationConfig/formatPatterns`).
    accept('json').
    then(res => res.body.formatPatterns);

  defaultLocale = () => ajaxRequest.
    get(`${window.simContextPath}/applicationConfig/defaultLocale`).
    accept('json').
    then(res => res.body);
}
