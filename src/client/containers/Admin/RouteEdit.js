import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n'

export default class RouteEdit extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        context.i18n.register('RouteAdmin.Edit', translations);

        this.RouteForm = context.loadComponent({
            serviceName: 'routing',
            moduleName: 'routing-routeform',
            onLoaded: ref => this.routeFormRef = ref
        });

        this.t = context.i18n.getMessage.bind(context.i18n);

        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    /**
     * Navigates to route list.
     */
    handleBackClick() {
        this.context.router.push('/bnp/routes');
    };

    handleSaveClick() {
        this.routeFormRef && this.routeFormRef.save()
            .then(() => this.context.router.push('/bnp/routes'));
    }

    render() {
        const { routeId } = this.props.params;

        this.context.setPageTitle(this.t('RouteAdmin.Edit.page.title'));

        return (
            <div>
                <button className='btn btn-default' onClick={this.handleBackClick}>
                    <span className="icon glyphicon glyphicon-chevron-left" />
                    {this.t('RouteAdmin.Edit.back')}
                </button>
                <this.RouteForm id={routeId === 'create' ? null : routeId} />
                <button className="btn btn-primary pull-right" onClick={this.handleSaveClick}>
                    {this.t('RouteAdmin.Edit.save')}
                </button>
            </div>
        )
    }
}
