import ApiBase from './ApiBase';

class Onboarding extends ApiBase {
  getCampaignContacts(queryParams) {
    return this.ajax.get('/onboarding/api/campaignContacts').set('Accept', 'application/json').
      query(queryParams || {}).then(response => response.body);
  }
}

export default Onboarding;
