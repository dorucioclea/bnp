import ApiBase from './ApiBase';

class BusinessLink extends ApiBase {
  all(queryParams) {
    return this.ajax.get(`/business-link/api/business-links`).set('Accept', 'application/json').
      query(queryParams || {}).then(response => response.body);
  }

  allForSupplierId(supplierId) {
    return this.ajax.get(`/business-link/api/suppliers/${supplierId}/business-links`).
    set('Accept', 'application/json').then(response => response.body);
  }
}

export default BusinessLink;
