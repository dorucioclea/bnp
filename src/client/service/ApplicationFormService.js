import axios from 'axios';

export default class ApplicationFormService {

  constructor(actionUrl) {
    this._applicationFormRestEndpoint = actionUrl;
  }

  getCountryList() {
    return axios.get(`${this._applicationFormRestEndpoint}/gateway/supplier/api/countries`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(errors => console.log('Error during retrieving Country list:', errors));
  }
}
