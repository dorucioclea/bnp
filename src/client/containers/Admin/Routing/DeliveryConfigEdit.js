import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../../i18n'

export default class DeliveryConfigEdit extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        context.i18n.register('RoutingAdmin.DeliveryConfig.Edit', translations);

        this.DeliveryConfigForm = context.loadComponent({
            serviceName: 'routing',
            moduleName: 'routing-deliveryconfigform',
            onLoaded: ref => this.deliveryConfigFormRef = ref
        });

        this.t = context.i18n.getMessage.bind(context.i18n);

        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    /**
     * Navigates to route list.
     */
    handleBackClick() {
        this.context.router.goBack();
    };

    handleSaveClick() {
        this.deliveryConfigFormRef && this.deliveryConfigFormRef.save()
            .then(() => this.context.router.push('/bnp/routes'));
    }

    render() {
        const { routeId } = this.props.params;

        this.context.setPageTitle(this.t('RoutingAdmin.DeliveryConfig.Edit.page.title'));

        return (
            <div>
                <button className='btn btn-default' onClick={this.handleBackClick}>
                    <span className="icon glyphicon glyphicon-chevron-left" />
                    {this.t('RoutingAdmin.DeliveryConfig.Edit.back')}
                </button>
                <this.DeliveryConfigForm id={routeId === 'create' ? null : routeId} />
                <button className="btn btn-primary pull-right" onClick={this.handleSaveClick}>
                    {this.t('RoutingAdmin.DeliveryConfig.Edit.save')}
                </button>
            </div>
        )
    }
}
