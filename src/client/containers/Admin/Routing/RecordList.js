import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../../i18n'

export default class RecordList extends Components.ContextComponent {

    constructor(props, context) {

        super(props);

        context.i18n.register('RoutingAdmin.List', translations);

        this.RecordList = context.loadComponent({
            serviceName: 'routing',
            moduleName: 'routing-recordlist'
        });

        this.t = context.i18n.getMessage.bind(context.i18n);
    }

    handleRouteEditClick(id) {
        this.context.router.push(`/bnp/routing/routes/${id}`);
    }

    handleDeliveryConfigEditClick(id) {
        this.context.router.push(`/bnp/routing/deliveryconfigs/${id}`);
    }

    handleDeliveryConfigTemplateEditClick(id) {
        this.context.router.push(`/bnp/routing/deliveryconfigtemplates/edit/${id}`);
    }

    handleDeliveryNodeEditClick(id) {
        this.context.router.push(`/bnp/routing/deliverynodes/${id}`);
    }

    handleCredentialEditClick(id) {
        this.context.router.push(`/bnp/routing/credentials/${id}`);
    }

    render() {
        this.context.setPageTitle(this.t('RouteAdmin.List.page.title'));

        return (
            <div>
                <h1>{this.t('RoutingAdmin.List.head')}</h1>
                <this.RecordList
                    onRouteEdit={id => this.handleRouteEditClick(id)}
                    onDeliveryConfigEdit={id => this.handleDeliveryConfigEditClick(id)}
                    onDeliveryConfigTemplateEdit={id => this.handleDeliveryConfigTemplateEditClick(id)}
                    onDeliveryNodeEdit={id => this.handleDeliveryNodeEditClick(id)}
                    onCredentialEdit={id => this.handleCredentialEditClick(id)}
                />
            </div>
        )
    }

}
