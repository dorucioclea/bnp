import ajaxRequest from 'superagent';

export default class OnboardingUserService {
  getOnboardingUserData(user) {
    return ajaxRequest.
      get(`/interaction/api/onboardData/${user}`).
      then(res => res.body).
      catch(err => ({
        status: err.status,
        message: err.body.message || err.body.text
      }));
  }
}
