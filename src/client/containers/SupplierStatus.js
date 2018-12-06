import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Supplier, BusinessLink, Onboarding } from '../api';

class SupplierStatus extends Components.ContextComponent {
  constructor(props, context) {
    super(props);
    this.state = {
      suppliers: [],
      businessLinksById: {},
      loading: true
    };
    this.onboardingApi = new Onboarding();
    this.supplierApi = new Supplier();
    this.businessLinkApi = new BusinessLink();
  }

  componentWillMount() {
    this.context.i18n.register('SupplierStatus', translations);
  }

  async componentDidMount() {
    const customerId = this.context.userData.customerid;
    console.log(customerId);
    if (!customerId) return null;

    try {
      const tenants = await this.context.bouncer.getUserTenants('customer', `/api/customers/${customerId}`, 'PUT');
      const campaignContacts = await this.onboardingApi.getCampaignContacts({ tenantIds: tenants.join(',') });

      const supplierIds = campaignContacts.reduce((acc, campaignContact) => {
        if (campaignContact.supplierId) acc.push(campaignContact.supplierId);

        return acc;
      }, []);

      if (supplierIds.length === 0) return null;

      Promise.all([
        this.supplierApi.getSuppliers({ id: supplierIds }),
        this.businessLinkApi.all({ supplierIds: supplierIds })
      ]).then(([suppliers, businessLinks]) => {
        const businessLinksById = businessLinks.reduce((acc, bl) => {
          const connectionsByType = bl.connections.reduce((obj, con) => {
            con.config = con.config && JSON.parse(con.config);
            obj[con.type] = con;
            return obj;
          }, {});

          acc[bl.supplierId] = { ...bl, connections: connectionsByType };
          return acc;
        }, {});
        this.setState({ suppliers, businessLinksById, loading: false });
      });
    } catch(err) {
      console.log(err);
      this.setState({ loading: false });
    }
  }

  render() {
    if (!this.context.userData.customerid) return null;
    const { i18n } = this.context;

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
          accessor: obj => obj.connections.invoice,
          Cell: row => {
            if (!row.value) return null;

            if (!row.value.config.keyin) return null;

            return <i className='fa fa-check' />;
          }
        },
        {
          Header: i18n.getMessage('SupplierStatus.invoice.einvoice'),
          id: 'einvoice',
          accessor: obj => obj.connections.invoice,
          Cell: row => {
            if (!row.value) return null;

            if (!row.value.config.einvoice) return null;

            return <i className='fa fa-check' />;
          }
        },
        {
          Header: i18n.getMessage('SupplierStatus.invoice.pdf'),
          id: 'pdf',
          accessor: obj => obj.connections.invoice,
          Cell: row => {
            if (!row.value) return null;

            if (!row.value.config.pdf) return null;

            return <i className='fa fa-check' />;
          }
        }]
      }
    ];

    return (
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
    );
  }
};

export default SupplierStatus;
