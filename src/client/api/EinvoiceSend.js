import ApiBase from './ApiBase';

class EinvoiceSend extends ApiBase {
  get(supplierId) {
    return this.ajax.get(`/einvoice-send/api/config/inchannels/${supplierId}`).
    set('Accept', 'application/json').then(response => response.body);
  }

  all(supplierIds) {
    return Promise.all(supplierIds.map(supplierId => this.get(supplierId).catch(() => null)));
  }
}

export default EinvoiceSend;
