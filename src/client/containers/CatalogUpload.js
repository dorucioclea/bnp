import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';
import ajax from 'superagent-bluebird-promise';

import { Customer, BusinessLink, Catalog } from '../api';


class CatalogUpload extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);
        this.businessLinkApi = new BusinessLink();
        this.customerApi = new Customer();
        this.catalogApi = new Catalog();

        this.state = { customers : [], businessLinks: [] }
    }

    componentWillMount()
    {
        this.context.i18n.register('CatalogUpload', translations);
    }

    componentDidMount()
    {
        this.businessLinkApi.allForSupplierId(this.context.userData.supplierid).then(businessLinks => {
            if (businessLinks.length === 0) return;

            const customerIds = businessLinks.reduce((accumulator, link) => {
                if (link.connections.some(conn => conn.type === 'catalog')) accumulator.push(link.customerId);
                return accumulator;
            }, []);

            if (customerIds.length === 0) return;

            this.customerApi.getCustomers({ id: customerIds.join(',') }).then(customers => this.setState({ customers, businessLinks }));
        });


    }

    onCustomerSelect(e)
    {
        const customerId = (typeof e === 'object') && e.target ? e.target.value : e;

        const businessLink = this.state.businessLinks.find(bl => bl.customerId === customerId);
        this.catalogApi.get(customerId, businessLink.customerSupplierId || businessLink.supplierId).then(catalog => {
            console.log(`onCustomerSelect url: ${catalog.url}`);
            window.open(catalog.url);
        }).catch(error => {
            const message = this.context.i18n.getMessage('CatalogUpload.urlError');
            if (this.context.showNotification) this.context.showNotification(message, 'error');
        });
    }

    render()
    {
        const { i18n } = this.context;

        return(
            <div>
                <h1>{this.context.i18n.getMessage('CatalogUpload.catalogUpload')}</h1>

                <div className="row">
                    <div className="col-md-3">
                        <label className="control-label">{this.context.i18n.getMessage('CatalogUpload.selectCustomer')}</label>
                    </div>
                    <div className="col-md-5">
                        <select type='text' className="form-control input-sm"
                            onChange = { e => this.onCustomerSelect(e) }
                        >
                            <option value=""></option>
                            {this.state.customers.map(customer =>
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            )};
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default CatalogUpload;
