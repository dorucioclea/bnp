import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class CustomerEditor extends Components.ContextComponent {

  constructor(props, context) {
    super(props);
    const serviceRegistry = (service) => ({ url: `/customer` });

    this.CustomerEditor = serviceComponent({
      serviceRegistry,
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

  render() {
    const { userData } = this.context;

    return (
      <this.CustomerEditor
        customerId={this.props.params.customerId}
        username={userData.id}
        userRoles={userData.roles}
        onChange={this.handleDirtyState}
        onUpdate={this.handleCustomerUpdate}
        onLogout={this.handleLogout}
      />
    );
  }
}
