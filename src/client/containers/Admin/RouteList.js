import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n'

export default class RouteList extends Components.ContextComponent {

    constructor(props, context) {

        super(props);

        context.i18n.register('RouteAdmin.List', translations);

        this.RouteList = context.loadComponent({
            serviceName: 'routing',
            moduleName: 'routing-routelist'
        });

        this.t = context.i18n.getMessage.bind(context.i18n);
    }

    /**
     * Route edit click handler.
     * @param {string} routeId Route identifier
     */
    handleEditClick(routeId) {
        this.context.router.push(`/bnp/routes/${routeId}`);
    }

    handleCreateClick() {
        this.context.router.push('/bnp/routes/create');
    }

    render() {
        this.context.setPageTitle(this.t('RouteAdmin.List.page.title'));

        return (
            <div>
                <button className='btn btn-primary pull-right' onClick={this.handleCreateClick.bind(this)}>{this.t('RouteAdmin.List.create')}</button>
                <h1>{this.t('RouteAdmin.List.head')}</h1>
                <this.RouteList onEdit={routeId => this.handleEditClick(routeId)} />
            </div>
        )
    }
}
