import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n';

export default class CatalogEditor extends Components.ContextComponent {

  constructor(props, context) {
    super(props);
    context.i18n.register('UserAdmin.Editor', translations);

    this.CatalogEditor = context.loadComponent({
      serviceName: 'catalog' ,
      moduleName: 'catalog-editor',
      jsFileName: 'editor-bundle'
    });
  }

  componentDidMount() {
     if (!this.context.userData.roles.includes('admin')) this.context.router.push(`/bnp`);
  }

  handleCreateOrUpdate = catalog => this.context.router.push(`/bnp/catalogs/${catalog.customerId}`);

  handleBackClick = () => this.context.router.push('/bnp/catalogs');

  render() {
    const { userData } = this.context;

    return (
      <div>
        <button className='btn btn-default' onClick={() => this.handleBackClick()}>
            <span className="icon glyphicon glyphicon-chevron-left" />
            {this.context.i18n.getMessage('UserAdmin.Editor.back')}
        </button>
        <this.CatalogEditor
          customerId={this.props.params && this.props.params.customerId}
          onCreateOrUpdate={catalog => this.handleCreateOrUpdate(catalog)}
        />
      </div>
    );
  }
}
