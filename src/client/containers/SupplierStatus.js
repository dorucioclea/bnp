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
        this.businessLinkApi.allForCustomerId(customerId, { supplierIds: supplierIds.join(',') })
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

  getBusinessLinkConnection(supplier, connectionType) {
    const businessLink = this.state.businessLinksById[supplier.id];
    if (!businessLink) return null;

    return businessLink.connections[connectionType];
  }

  render() {
    if (!this.context.userData.customerid) return null;
    const { i18n, businessLinksById } = this.context;

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
          accessor: element => this.getBusinessLinkConnection(element, 'invoice'),
          Cell: row => {
            if (!row.value || row.value.status !== 'connected') return null;

            if (!row.value.config.keyin) return null;

            return <i className='fa fa-check' />;
          }
        },
        {
          Header: i18n.getMessage('SupplierStatus.invoice.einvoice'),
          id: 'einvoice',
          accessor: element => this.getBusinessLinkConnection(element, 'invoice'),
          Cell: row => {
            if (!row.value || row.value.status !== 'connected') return null;

            if (!row.value.config.einvoice) return null;

            return <i className='fa fa-check' />;
          }
        },
        {
          Header: i18n.getMessage('SupplierStatus.invoice.pdf'),
          id: 'pdf',
          accessor: element => this.getBusinessLinkConnection(element, 'invoice'),
          Cell: row => {
            if (!row.value || row.value.status !== 'connected') return null;

            if (!row.value.config.pdf) return null;

            return <i className='fa fa-check' />;
          }
        }]
      },
      {
        Header: i18n.getMessage('SupplierStatus.order'),
        id: 'order',
        accessor: element => this.getBusinessLinkConnection(element, 'order'),
        Cell: row => {
          if (!row.value || row.value.status !== 'connected') return null;

          return <i className='fa fa-check' />;
        }
      },
      {
        Header: i18n.getMessage('SupplierStatus.catalog'),
        id: 'catalog',
        accessor: element => this.getBusinessLinkConnection(element, 'catalog'),
        Cell: row => {
          if (!row.value || row.value.status !== 'connected') return null;

          return <i className='fa fa-check' />;
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

export default SupplierStatus;
