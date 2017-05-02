import ajaxRequest from 'superagent';

export default class ApplicationFormService {
  constructor(actionUrl) {
    this._applicationFormRestEndpoint = actionUrl;
  }
}
