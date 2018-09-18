import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';

export default class BusinessLinkConnections extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.tenant = determineTenant(context.userData);

        context.i18n.register('BusinessLink', translations);

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
                <h1>{i18n.getMessage(`BusinessLink.Connections.${this.tenant.type}Title`)}</h1>

                <this.Connections tenantId={this.tenant.id} />
            </div>
        )
    }
}

let determineTenant = function(userData)
{
  if (userData.supplierid) return { type: 'supplier', id: `s_${userData.supplierid}` };

  if (userData.customerid) return { type: 'customer', id: `c_${userData.customerid}` };

  return { type: null, id: null };
}
