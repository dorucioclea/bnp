import request from 'superagent-bluebird-promise';

export default class ApplicationFormService {
  constructor(actionUrl) {
    this._applicationFormRestEndpoint = actionUrl;
  }

  getCountryList() {
    return request.
      get(`${this._applicationFormRestEndpoint}/gateway/supplier/api/countries`).
      promise();
  }
}
