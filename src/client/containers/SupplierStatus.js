import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Supplier, BusinessLink, Onboarding, EinvoiceSend } from '../api';

const configType2Inchannel = {
  pdf: 'PdfChannelConfig',
  keyin: 'SupplierPortalConfig',
  einvoice: 'EInvoiceChannelConfig'
}

export default class SupplierStatus extends Components.ContextComponent {
  constructor(props, context) {
    super(props);
    this.state = {
      suppliers: [],
      bisLinksBySupplierId: {},
      invoiceConfigsBySupplierId: {},
      loading: true
    };
    this.onboardingApi = new Onboarding();
    this.supplierApi = new Supplier();
    this.businessLinkApi = new BusinessLink();
    this.einvoiceSendApi = new EinvoiceSend();
  }

  componentWillMount() {
    this.context.i18n.register('SupplierStatus', translations);
  }

  async componentDidMount() {
    const customerId = this.context.userData.customerid;
    if (!customerId) return null;

    try {
      const campaignContacts = await this.onboardingApi.getCampaignContacts({ tenantIds: `c_${customerId}` });

      const supplierIds = campaignContacts.reduce((acc, campaignContact) => {
        if (campaignContact.supplierId) acc.push(campaignContact.supplierId);

        return acc;
      }, []);

      if (supplierIds.length === 0) {
        this.setState({ loading: false });
        return null;
      }

      Promise.all([
        this.supplierApi.getSuppliers({ id: supplierIds.join(',') }),
        this.businessLinkApi.allForCustomerId(customerId, { supplierIds: supplierIds.join(',') }),
        this.einvoiceSendApi.all(supplierIds)
      ]).then(([suppliers, businessLinks, invoiceConfigs]) => {
        const bisLinksBySupplierId = businessLinks.reduce((acc, bl) => {
          const connectionsByType = bl.connections.reduce((obj, con) => {
            con.config = con.config && JSON.parse(con.config);
            obj[con.type] = con;
            return obj;
          }, {});

          acc[bl.supplierId] = { ...bl, connections: connectionsByType };
          return acc;
        }, {});
        const invoiceConfigsBySupplierId = invoiceConfigs.reduce((acc, ic) => {
          if (!ic) return acc;

          acc[ic.supplierId] = {
            keyin: ic[configType2Inchannel.keyin],
            einvoice: ic[configType2Inchannel.einvoice],
            pdf: ic[configType2Inchannel.pdf]
          }

          return acc;
        }, {});
        this.setState({ suppliers, bisLinksBySupplierId, invoiceConfigsBySupplierId, loading: false });
      });
    } catch(err) {
      console.log(err);
      this.setState({ loading: false });
    }
  }

  getBusinessLinkConnection(supplier, connectionType) {
    const businessLink = this.state.bisLinksBySupplierId[supplier.id];
    if (!businessLink) return null;

    return businessLink.connections[connectionType];
  }

  getInvoiceConfig(supplier, invoiceType) {
    const config = this.state.invoiceConfigsBySupplierId[supplier.id];
    if (!config) return null;

    return config[invoiceType];
  }

  renderActivatedStatus() {
    return <i className='fa fa-check' />;
  }

  render() {
    if (!this.context.userData.customerid) return null;
    const { i18n, bisLinksBySupplierId } = this.context;

    const columns = [
      {
        Header: i18n.getMessage('SupplierStatus.supplierName'),
        accessor: 'name'
      },
      {
        Header: i18n.getMessage('SupplierStatus.invoice.title'),
        columns: [{
          Header: i18n.getMessage('SupplierStatus.invoice.keyin'),
          id: 'keyin',
          accessor: element => element,
          Cell: row => {
            const blc = this.getBusinessLinkConnection(row.value, 'invoice');
            if (!blc || blc.status !== 'connected') return null;

            const invoiceConfig = this.getInvoiceConfig(row.value, 'keyin');
            if (!invoiceConfig || invoiceConfig.status !== 'activated') return null;

            return this.renderActivatedStatus();
          }
        },
        {
          Header: i18n.getMessage('SupplierStatus.invoice.einvoice'),
          id: 'einvoice',
          accessor: element => element,
          Cell: row => {
            const blc = this.getBusinessLinkConnection(row.value, 'invoice');
            if (!blc || blc.status !== 'connected') return null;

            const invoiceConfig = this.getInvoiceConfig(row.value, 'einvoice');
            if (!invoiceConfig || invoiceConfig.status !== 'activated') return null;

            return this.renderActivatedStatus();
          }
        },
        {
          Header: i18n.getMessage('SupplierStatus.invoice.pdf'),
          id: 'pdf',
          accessor: element => element,
          Cell: row => {
            const blc = this.getBusinessLinkConnection(row.value, 'invoice');
            if (!blc || blc.status !== 'connected') return null;

            const invoiceConfig = this.getInvoiceConfig(row.value, 'pdf');
            if (!invoiceConfig || invoiceConfig.status !== 'activated') return null;

            return this.renderActivatedStatus();
          }
        }]
      },
      {
        Header: i18n.getMessage('SupplierStatus.order'),
        id: 'order',
        accessor: element => this.getBusinessLinkConnection(element, 'order'),
        Cell: row => {
          if (!row.value || row.value.status !== 'connected') return null;

          return this.renderActivatedStatus();
        }
      },
      {
        Header: i18n.getMessage('SupplierStatus.catalog'),
        id: 'catalog',
        accessor: element => this.getBusinessLinkConnection(element, 'catalog'),
        Cell: row => {
          if (!row.value || row.value.status !== 'connected') return null;

          return this.renderActivatedStatus();
        }
      }
    ];

    return (
      <div>
        <h1>{i18n.getMessage('SupplierStatus.title')}</h1>
        <ReactTable
          data={this.state.suppliers}
          columns={columns}
          defaultPageSize={10}
          loading={this.state.loading}
          className="table text-center"
          previousText={i18n.getMessage('SupplierStatus.Table.previousPage')}
          nextText={i18n.getMessage('SupplierStatus.Table.nextPage')}
          noDataText={i18n.getMessage('SupplierStatus.Table.noDataText')}
          loadingText={i18n.getMessage('SupplierStatus.Table.loadingText')}
          pageText={i18n.getMessage('SupplierStatus.Table.pageText')}
          ofText={i18n.getMessage('SupplierStatus.Table.ofText')}
          rowsText={i18n.getMessage('SupplierStatus.Table.rowsText')}
        />
      </div>
    );
  }
};
