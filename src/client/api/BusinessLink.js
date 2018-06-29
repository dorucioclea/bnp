import ApiBase from './ApiBase';

class BusinessLink extends ApiBase {
  allForSupplierId(supplierId) {
    return this.ajax.get(`/business-link/api/suppliers/${supplierId}/business-links`).set('Accept', 'application/json').
      then(response => response.body);
  }
}

export default BusinessLink;
