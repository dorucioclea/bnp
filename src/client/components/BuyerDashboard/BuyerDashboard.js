/* eslint-disable */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class BuyerDashboard extends React.Component
{
    static contextTypes = {
        i18n : React.PropTypes.object
    }

    constructor(props)
    {
        super(props);
        
        this.state = {
            change : false
        }

        let serviceRegistry = (service) => ({ url: '/onboarding' });

        const FunnelChart = serviceComponent({
            serviceRegistry,
            serviceName: 'onboarding',
            moduleName: 'funnelChart'
        });

        const RecentCampaigns = serviceComponent({
            serviceRegistry,
            serviceName: 'onboarding',
            moduleName: 'recentCampaigns'
        });

        this.externalComponents = {
            FunnelChart,
            RecentCampaigns
        };
    }

    componentWillReceiveProps(nextProps, nextContext)
    {
        if(this.context.i18n != nextContext.i18n)
            this.setState({ change : true });
    }

    render()
    {
        const { FunnelChart, RecentCampaigns } = this.externalComponents;

        return(
            <div>
                <br/>
                <Row>
                    <Col md={6}>
                        <RecentCampaigns />
                        <div className="panel panel-success">
                            <FunnelChart />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
