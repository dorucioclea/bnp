import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../../i18n'

export default class CredentialEdit extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        context.i18n.register('RoutingAdmin.Credential.Edit', translations);

        this.CredentialForm = context.loadComponent({
            serviceName: 'routing',
            moduleName: 'routing-credentialform',
            onLoaded: ref => this.credentialFormRef = ref
        });

        this.t = context.i18n.getMessage.bind(context.i18n);

        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    /**
     * Navigates to route list.
     */
    handleBackClick() {
        this.context.router.goBack();
    };

    handleSaveClick() {
        this.credentialFormRef && this.credentialFormRef.save()
            .then(() => this.context.router.push('/bnp/routing'));
    }

    render() {
        const { credentialId } = this.props.params;

        this.context.setPageTitle(this.t('RoutingAdmin.Credential.Edit.page.title'));

        return (
            <div>
                <button className='btn btn-default' onClick={this.handleBackClick}>
                    <span className="icon glyphicon glyphicon-chevron-left" />
                    {this.t('RoutingAdmin.Credential.Edit.back')}
                </button>
                <this.CredentialForm id={credentialId === 'create' ? null : credentialId} />
                <button className="btn btn-primary pull-right" onClick={this.handleSaveClick}>
                    {this.t('RoutingAdmin.Credential.Edit.save')}
                </button>
            </div>
        )
    }
}
