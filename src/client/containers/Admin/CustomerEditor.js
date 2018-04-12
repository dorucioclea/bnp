import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n';

export default class CustomerEditor extends Components.ContextComponent {

  constructor(props, context) {
    super(props);
    context.i18n.register('UserAdmin.Editor', translations);

    this.CustomerEditor = context.loadComponent({
      serviceName: 'customer' ,
      moduleName: 'customer-information',
      jsFileName: 'information-bundle'
    });
  }

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  };

  handleCustomerUpdate = () => null;

  handleLogout = () => this.context.logOutUser();

  handleBackClick = () => this.context.router.push('/bnp/customers');

  render() {
    const { userData } = this.context;

    return (
      <div>
        <button className='btn btn-default' onClick={() => this.handleBackClick()}>
            <span className="icon glyphicon glyphicon-chevron-left" />
            {this.context.i18n.getMessage('UserAdmin.Editor.back')}
        </button>
        <this.CustomerEditor
          customerId={this.props.params.customerId}
          username={userData.id}
          userRoles={userData.roles}
          onChange={this.handleDirtyState}
          onUpdate={this.handleCustomerUpdate}
          onLogout={this.handleLogout}
        />
      </div>
    );
  }
}
