import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n';

export default class BusinessLinkEditor extends Components.ContextComponent {

  constructor(props, context) {
    super(props);
    context.i18n.register('UserAdmin.Editor', translations);

    this.BusinessLinkEditor = context.loadComponent({
      serviceName: 'business-link' ,
      moduleName: 'business-link-editor',
      jsFileName: 'editor-bundle'
    });
  }

  componentDidMount() {
     if (!this.context.userData.roles.includes('admin')) this.context.router.push(`/bnp`);
  }

  handleCreateOrUpdate = (bl) => this.context.router.push(`/bnp/businesslinks/${bl.id}`);

  handleBackClick = () => this.context.router.push('/bnp/businesslinks');

  render() {
    const { userData } = this.context;

    return (
      <div>
        <button className='btn btn-default' onClick={() => this.handleBackClick()}>
            <span className="icon glyphicon glyphicon-chevron-left" />
            {this.context.i18n.getMessage('UserAdmin.Editor.back')}
        </button>
        <this.BusinessLinkEditor
          businessLinkId={this.props.params && this.props.params.businessLinkId}
          onCreateOrUpdate={businessLink => this.handleCreateOrUpdate(businessLink)}
        />
      </div>
    );
  }
}
