import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n/index'
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';
import './AclAdmin.css';

export default class AclAdmin extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        context.i18n.register('AclAdmin', translations);

        this.AclEditor = serviceComponent({
            serviceRegistry: () => ({ url: `/acl` }),
            serviceName: 'acl' ,
            moduleName: 'acl-editor',
            jsFileName: 'editor-bundle'
        });

        this.UserRolePicker = serviceComponent({
            serviceRegistry: () => ({ url: `/user` }),
            serviceName: 'user' ,
            moduleName: 'user-rolepicker',
            jsFileName: 'rolepicker-bundle'
        });
    }

    /**
     * Role changed handler
     * @param {string} roleId Role identifier
     */
    roleChange(roleId) {
        this.props.router.push(`/bnp/permissions/${roleId}`);
    }

    render() {
        const i18n = this.context.i18n.getMessage.bind(this.context.i18n);
        this.context.setPageTitle(i18n('AclAdmin.page.title'));

        return (
            <div>
                <section>
                    <h2>{i18n('AclAdmin.authority.heading')}</h2>
                    <this.UserRolePicker
                        className="acl-admin-role-picker"
                        value={this.props.params.roleId}
                        onChange={roleId => this.roleChange(roleId)}
                    />
                </section>

                {this.props.params.roleId &&
                    <section>
                        <h2>{i18n('AclAdmin.permissions.heading')}</h2>
                        <this.AclEditor
                            className="acl-admin-editor"
                            role={this.props.params.roleId}
                        />
                    </section>}
            </div>
        )
    }
}
