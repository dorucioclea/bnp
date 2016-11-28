import axios from 'axios';

export default class UserRegistrationService {

  constructor() {
    this._createUser = 'user/createUser';
  }

  createUser = (object) => {
    return axios.post(this._createUser, JSON.stringify(object), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };
}
