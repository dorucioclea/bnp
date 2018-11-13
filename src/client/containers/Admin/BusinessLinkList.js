import React from 'react';
import { Components } from '@opuscapita/service-base-ui';

export default class BusinessLinkList extends Components.ContextComponent {
  constructor(props, context) {
    super(props);

    this.BusinessLinks = context.loadComponent({
      serviceName: 'business-link' ,
      moduleName: 'business-link-businessLinks',
      jsFileName: 'businessLinks-bundle'
    });
  }

  componentDidMount() {
     if (!this.context.userData.roles.includes('admin')) this.context.router.push(`/bnp`);
  }

  handleEdit(businessLinkId) {
    this.context.router.push(`/bnp/businesslinks/${businessLinkId}`);
  }

  handleCreateClick() {
    this.context.router.push(`/bnp/businesslinks/new`);
  }

  render() {
    return (
      <div>
        <button className='btn btn-primary pull-right' onClick={this.handleCreateClick.bind(this)} >{this.context.i18n.getMessage('BusinessLinkList.create')}</button>
        <this.BusinessLinks onEdit={businessLinkId => this.handleEdit(businessLinkId)} />
      </div>
    );
  }
};
