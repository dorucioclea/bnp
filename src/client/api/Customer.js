import ApiBase from './ApiBase';

class Customer extends ApiBase {
  getCustomers(queryParams) {
    return this.ajax.get('/customer/api/customers').set('Accept', 'application/json').
      query(queryParams || {}).then(response => response.body);
  }
}

export default Customer;
