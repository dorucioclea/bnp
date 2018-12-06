import React from 'react';
import { Components } from '@opuscapita/service-base-ui';


export default class CustomerCreate extends Components.ContextComponent {
  constructor(props, context) {
    super(props);

    this.CustomerCreate = context.loadComponent({
      serviceName: 'customer',
      moduleName: 'customer-creation',
      jsFileName: 'creation-bundle'
    });
  }

  componentDidMount() {
     if (!this.context.userData.roles.includes('admin')) this.context.router.push(`/bnp`);
  }

  handleCreate(customerId) {
    this.context.router.push(`/bnp/customers/${customerId}`);
  }

  render() {

    return (
      <div>
        <a
          target="_blank"
          href="https://docs.google.com/document/d/1XHO3D2_10iTBmtZhhbStJ7oD4uZiTJoedjmTiH9I8qg/edit#heading=h.gjdgxs"
          className="btn btn-link pull-right"
        >{this.context.i18n.getMessage('CustomerList.createGuidelines')}</a>
        <this.CustomerCreate userRoles={this.context.userData.roles} onCreate={id => this.handleCreate(id)} onChange={() => null}/>
      </div>
    );
  }
}
