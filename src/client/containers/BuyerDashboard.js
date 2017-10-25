import React from 'react';
import { Components, System } from '@opuscapita/service-base-ui';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class BuyerDashboard extends Components.ContextComponent
{
    constructor(props)
    {
        super(props);

        const serviceRegistry = (service) => ({ url: '/onboarding' });

        this.FunnelChart = serviceComponent({
            serviceRegistry,
            serviceName: 'onboarding',
            moduleName: 'funnelChart'
        });

        this.RecentCampaigns = serviceComponent({
            serviceRegistry,
            serviceName: 'onboarding',
            moduleName: 'recentCampaigns'
        });
    }

    render()
    {
        return(
            <div className="row">
                <div className="col-md-6">
                    <this.RecentCampaigns />
                </div>
                <div className="col-md-6">
                    <this.FunnelChart />
                </div>
            </div>
        )
    }
}
