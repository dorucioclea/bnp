import ApiBase from './ApiBase';

class Supplier extends ApiBase {
  getSuppliers(queryParams) {
    return this.ajax.get('/supplier/api/suppliers').set('Accept', 'application/json').
      query(queryParams || {}).then(response => response.body);
  }
}

export default Supplier;
