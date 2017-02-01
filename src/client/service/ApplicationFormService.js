import ajaxRequest from 'superagent';

export default class ApplicationFormService {
  constructor(actionUrl) {
    this._applicationFormRestEndpoint = actionUrl;
  }

  getCountryList() {
    return ajaxRequest.
      get(`${this._applicationFormRestEndpoint}/gateway/supplier/api/countries`).
      then(res => res.body).
      catch(err => ({
        status: err.status,
        message: err.response.body || err.response.text
      }))
  }
}
