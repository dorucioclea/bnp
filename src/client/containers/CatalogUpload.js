import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';
import ajax from 'superagent-bluebird-promise';

import { Customer, BusinessLink } from '../api';


class CatalogUpload extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);
        this.businessLinkApi = new BusinessLink();
        this.customerApi = new Customer();

        this.state = {
            customers : []
        }
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
            this.customerApi.getCustomers({ id: customerIds.join(',') }).then(customers => this.setState({ customers }));
        });


    }

    onCustomerSelect(e)
    {
        const customerId = (typeof e === 'object') && e.target ? e.target.value : e;
        const url = customerId.match('schindler-') ? 'https://schindler-test.opuscapita.com/ssm' : 'https://opuscapita.jcatalog.com/bnp/ssm';
        console.log(`onCustomerSelect url: ${url}`);
        window.open(`${url}/standardWorkflow/index?customerId=${customerId}`);
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
