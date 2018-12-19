import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n';

export default class CatalogList extends Components.ContextComponent {
  constructor(props, context) {
    super(props);
    context.i18n.register('CatalogList', translations);

    this.Catalogs = context.loadComponent({
      serviceName: 'catalog' ,
      moduleName: 'catalog-list',
      jsFileName: 'list-bundle'
    });
  }

  componentDidMount() {
     if (!this.context.userData.roles.includes('admin')) this.context.router.push(`/bnp`);
  }

  handleEdit(customerId) {
    this.context.router.push(`/bnp/catalogs/${customerId}`);
  }

  handleCreateClick() {
    this.context.router.push(`/bnp/catalogs/new`);
  }

  render() {
    return (
      <div>
        <button className='btn btn-primary pull-right' onClick={this.handleCreateClick.bind(this)} >{this.context.i18n.getMessage('CatalogList.create')}</button>
        <this.Catalogs onEdit={customerId => this.handleEdit(customerId)} />
      </div>
    );
  }
};
