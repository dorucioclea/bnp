import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../../i18n/index'
import './AclEditor.css';

export default class AclEditor extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        context.i18n.register('AclEditor', translations);

        this.RoleManager = context.loadComponent({
            serviceName: 'user',
            moduleName: 'user-role-manager',
            jsFileName: 'role-manager-bundle'
        });
    }

    render()
    {
        const i18n = this.context.i18n.getMessage.bind(this.context.i18n);
        this.context.setPageTitle(i18n('AclEditor.page.title'));

        return (
            <div>
                <section>
                    <h2>{i18n('AclEditor.authority.heading')}</h2>
                </section>
                <section>
                    <this.RoleManager />
                </section>
            </div>
        )
    }
}
