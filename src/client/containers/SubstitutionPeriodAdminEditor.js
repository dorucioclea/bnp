import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';

class SubstitutionPeriodAdminEditor extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.SubstitutionPeriodAdminEditor = context.loadComponent({
            serviceName: 'user',
            moduleName: 'user-substitution-period-admin-editor',
            jsFileName: 'substitution-period-admin-editor-bundle'
        });
    }

    render()
    {
        const { userData } = this.context;

        return(
            <this.SubstitutionPeriodAdminEditor
                userId={userData.id}
            />
        )
    }
}

export default SubstitutionPeriodAdminEditor;
