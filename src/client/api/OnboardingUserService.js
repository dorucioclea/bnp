const { ApiBase } = require('./ApiBase');

export default class OnboardingUserService extends ApiBase
{
    getOnboardingUserData(userId)
    {
        return this.ajax.get(`/user/api/onboardData/${userId}`)
            .then(res => res && res.body).catch(this.getErrorFromResponse);
    }
}
