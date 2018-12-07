import ApiBase from './ApiBase';

class BusinessLink extends ApiBase {
  allForCustomerId(customerId, queryParams) {
    return this.ajax.get(`/business-link/api/customers/${customerId}/business-links`).
    set('Accept', 'application/json').query(queryParams || {}).then(response => response.body);
  }

  allForSupplierId(supplierId) {
    return this.ajax.get(`/business-link/api/suppliers/${supplierId}/business-links`).
    set('Accept', 'application/json').then(response => response.body);
  }
}

export default BusinessLink;
