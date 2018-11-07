import ApiBase from './ApiBase';

class Catalog extends ApiBase {
  get(customerId, supplierId) {
    return this.ajax.get(`/catalog/api/catalogs/${customerId}?supplierId=${supplierId}`).set('Accept', 'application/json').
      then(response => response.body);
  }
}

export default Catalog;
