import React from 'react';
import { Components, System } from '@opuscapita/service-base-ui';
import translations from './i18n';

export default class BuyerDashboard extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        context.i18n.register('BuyerDashboard', translations);

        this.FunnelChart = context.loadComponent({
            serviceName: 'onboarding',
            moduleName: 'funnelChart'
        });

        this.RecentCampaigns = context.loadComponent({
            serviceName: 'onboarding',
            moduleName: 'recentCampaigns'
        });
    }

    render()
    {
        this.context.setPageTitle(this.context.i18n.getMessage('BuyerDashboard.page.title'));

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
