import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../../i18n/index'
import './AclEditor.css';

export default class AclEditor extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        context.i18n.register('AclEditor', translations);

        this.AclEditor = context.loadComponent({
            serviceName: 'acl' ,
            moduleName: 'acl-editor',
            jsFileName: 'editor-bundle'
        });

        this.UserRolePicker = context.loadComponent({
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
        this.context.setPageTitle(i18n('AclEditor.page.title'));

        return (
            <div>
                <section>
                    <h2>{i18n('AclEditor.authority.heading')}</h2>
                    <this.UserRolePicker
                        className="acl-admin-role-picker"
                        value={this.props.params.roleId}
                        onChange={roleId => this.roleChange(roleId)}
                    />
                </section>

                {this.props.params.roleId &&
                    <section>
                        <h2>{i18n('AclEditor.permissions.heading')}</h2>
                        <this.AclEditor role={this.props.params.roleId} />
                    </section>}
            </div>
        )
    }
}
