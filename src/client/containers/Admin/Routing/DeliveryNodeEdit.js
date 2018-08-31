import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../../i18n'

export default class DeliveryNodeEdit extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        context.i18n.register('RoutingAdmin.DeliveryNode.Edit', translations);

        this.DeliveryNodeForm = context.loadComponent({
            serviceName: 'routing',
            moduleName: 'routing-deliverynodeform',
            onLoaded: ref => this.deliveryNodeFormRef = ref
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
        this.deliveryNodeFormRef && this.deliveryNodeFormRef.save()
            .then(() => this.context.router.push('/bnp/routes'));
    }

    render() {
        const { deliveryNodeId } = this.props.params;

        this.context.setPageTitle(this.t('RoutingAdmin.DeliveryNode.Edit.page.title'));

        return (
            <div>
                <button className='btn btn-default' onClick={this.handleBackClick}>
                    <span className="icon glyphicon glyphicon-chevron-left" />
                    {this.t('RoutingAdmin.DeliveryNode.Edit.back')}
                </button>
                <this.DeliveryNodeForm id={deliveryNodeId === 'create' ? null : deliveryNodeId} />
                <button className="btn btn-primary pull-right" onClick={this.handleSaveClick}>
                    {this.t('RoutingAdmin.DeliveryNode.Edit.save')}
                </button>
            </div>
        )
    }
}
