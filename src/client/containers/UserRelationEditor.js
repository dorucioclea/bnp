import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';

class UserRelationEditor extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.RelationEdtior = context.loadComponent({
            serviceName: 'user',
            moduleName: 'user-relation-editor',
            jsFileName: 'relation-editor-bundle'
        });
    }

    render()
    {

        const { userData } = this.context;

        return(
            <this.RelationEdtior
                userId={userData.id}
                relationType={'substitute'}
            />
        )
    }
}

export default UserRelationEditor;
