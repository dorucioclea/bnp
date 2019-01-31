import ApiBase from './ApiBase';

class EinvoiceSend extends ApiBase {
  all(supplierIds) {
    const queryParams = supplierIds.length > 0 ? { id: supplierIds.join(',') } : {};
    return this.ajax.get(`/einvoice-send/api/config/inchannels`).set('Accept', 'application/json').
      query(queryParams).then(response => response.body);
  }
}

export default EinvoiceSend;
