import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../../i18n'

export const DELIVERY_CHANNEL_ID = {
    GENERIC: 'generic',
    MDRTC: 'mdrtc'
};

export default class DeliveryConfigTemplateList extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        context.i18n.register('RoutingAdmin.DeliveryConfigTemplate.List', translations);

        this.DeliveryConfigTemplateList = context.loadComponent({
            serviceName: 'routing',
            moduleName: 'routing-deliveryconfigtemplatelist'
        });

        this.t = context.i18n.getMessage.bind(context.i18n);

        this.state = {
            deliveryChannelId: DELIVERY_CHANNEL_ID[Object.keys(DELIVERY_CHANNEL_ID)[0]]
        };
    }

    /**
     * Delivery config template edit click handler.
     * @param {string} deliveryConfigTemplateId Delivery config template identifier
     */
    handleEditClick(deliveryConfigTemplateId) {
        this.context.router.push(`/bnp/routing/deliveryconfigtemplates/edit/${deliveryConfigTemplateId}`);
    }

    handleCreateClick() {
        this.context.router.push(`/bnp/routing/deliveryconfigtemplates/create/${this.state.deliveryChannelId}`);
    }

    render() {
        const { deliveryChannelId } = this.state;

        this.context.setPageTitle(this.t('RoutingAdmin.DeliveryConfigTemplate.List.page.title'));

        return (
            <div>
                <button className='btn btn-primary pull-right' onClick={this.handleCreateClick.bind(this)}>{this.t('RoutingAdmin.DeliveryConfigTemplate.List.create.button')}</button>
                <select
                    className='form-control pull-right'
                    style={{ width: 'auto', marginRight: '5px' }}
                    value={deliveryChannelId}
                    onChange={event => this.setState({ deliveryChannelId: event.target.value })}
                >
                    {Object.keys(DELIVERY_CHANNEL_ID).map(key => <option value={DELIVERY_CHANNEL_ID[key]}>{this.t(`RoutingAdmin.DeliveryConfigTemplate.List.create.deliveryChannelId.${DELIVERY_CHANNEL_ID[key]}`)}</option>)}
                </select>
                <h1>{this.t('RoutingAdmin.DeliveryConfigTemplate.List.head')}</h1>
                <this.DeliveryConfigTemplateList onEdit={routeId => this.handleEditClick(routeId)} />
            </div>
        )
    }

}
