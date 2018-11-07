import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';

export default class BusinessLinkConnections extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.tenant = determineTenant(context.userData);

        context.i18n.register('BusinessLinkConnections', translations);

        this.Connections = context.loadComponent({
            serviceName: 'business-link',
            moduleName: 'business-link-connections',
            jsFileName: 'connections-bundle'
        });
    }

    render()
    {
        const { i18n } = this.context;

        return(
            <div>
                <h1>{i18n.getMessage(`BusinessLinkConnections.${this.tenant.otherType}Title`)}</h1>

                <this.Connections tenantId={this.tenant.id} />
            </div>
        )
    }
}

let determineTenant = function(userData)
{
  if (userData.supplierid) return { type: 'supplier', otherType: 'customer', id: `s_${userData.supplierid}` };

  if (userData.customerid) return { type: 'customer', otherType: 'supplier', id: `c_${userData.customerid}` };

  return { type: null, otherType: null, id: null };
}
