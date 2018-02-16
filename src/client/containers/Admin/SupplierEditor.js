import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class SupplierEditor extends Components.ContextComponent {

  constructor(props, context) {
    super(props);
    const serviceRegistry = (service) => ({ url: `/supplier` });

    this.SupplierEditor = serviceComponent({
      serviceRegistry,
      serviceName: 'supplier' ,
      moduleName: 'supplier-information',
      jsFileName: 'information-bundle'
    });
  }

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  };

  handleSupplierUpdate = () => null;

  handleLogout = () => this.context.logOutUser();

  handleBackClick = () => this.context.router.push('/bnp/suppliers');

  render() {
    const { userData } = this.context;

    return (
      <div>
        <button className='btn btn-default' onClick={() => this.handleBackClick()}>
            <span className="icon glyphicon glyphicon-chevron-left" />
            {this.context.i18n.getMessage('UserAdmin.Editor.back')}
        </button>
        <this.SupplierEditor
          supplierId={this.props.params.supplierId}
          username={userData.id}
          userRoles={userData.roles}
          onChange={this.handleDirtyState}
          onUpdate={this.handleSupplierUpdate}
          onLogout={this.handleLogout}
        />
      </div>
    );
  }
}
