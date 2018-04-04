import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';
import ajax from 'superagent-bluebird-promise';

import { Customer } from '../api';


class CatalogUpload extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);
        this.customerApi = new Customer();

        this.state = {
            customers : []
        }

        this.CustomerList = context.loadComponent({
            serviceName: 'customer' ,
            moduleName: 'customer-list',
            jsFileName: 'list-bundle'
        });
    }

    componentWillMount()
    {
        this.context.i18n.register('CatalogUpload', translations);
    }

    componentDidMount()
    {
        this.customerApi.getCustomers()
        .then( (customers) => this.setState({ customers }) );
    }

    onCustomerSelect(e)
    {
        const customerId = (typeof e === 'object') && e.target ? e.target.value : e;
        console.log("onCustomerSelect: ", customerId);
        window.open(`https://opuscapita.jcatalog.com/bnp/ssm/standardWorkflow/index?customerId=${customerId}`);
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
                <div className="row">
                    <button className="btn btn-primary" onClick={e => window.open("https://opuscapita.jcatalog.com/bnp/ssm/standardWorkflow/index")}
                    >
                        {this.context.i18n.getMessage('CatalogUpload.openCatalogUpload')}
                    </button>
                </div>
            </div>
        )
    }
}

export default CatalogUpload;
