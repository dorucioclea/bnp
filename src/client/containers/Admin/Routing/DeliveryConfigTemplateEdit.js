import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../../i18n'

export default class DeliveryConfigTemplateEdit extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        context.i18n.register('RoutingAdmin.DeliveryConfigTemplate.Edit', translations);

        this.DeliveryConfigTemplateForm = context.loadComponent({
            serviceName: 'routing',
            moduleName: 'routing-deliveryconfigtemplateform'
        });

        this.t = context.i18n.getMessage.bind(context.i18n);

        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    /**
     * Navigates to delivery config template list.
     */
    handleBackClick() {
        this.context.router.goBack();
    };

    handleSaveClick() {
        this.deliveryConfigTemplateFormRef && this.deliveryConfigTemplateFormRef.save()
            .then(() => this.context.router.push('/bnp/routing/deliveryconfigtemplates'));
    }

    render() {
        const { deliveryConfigTemplateId, deliveryChannelId } = this.props.params;

        this.context.setPageTitle(this.t('RoutingAdmin.DeliveryConfigTemplate.Edit.page.title'));

        return (
            <div>
                <button className='btn btn-default' onClick={this.handleBackClick}>
                    <span className="icon glyphicon glyphicon-chevron-left" />
                    {this.t('RoutingAdmin.DeliveryConfigTemplate.Edit.back')}
                </button>
                <this.DeliveryConfigTemplateForm
                    id={deliveryConfigTemplateId}
                    deliveryChannelId={deliveryChannelId}
                    xref={ref => this.deliveryConfigTemplateFormRef = ref}
                />
                <button className="btn btn-primary pull-right" onClick={this.handleSaveClick}>
                    {this.t('RoutingAdmin.DeliveryConfigTemplate.Edit.save')}
                </button>
            </div>
        )
    }
}
