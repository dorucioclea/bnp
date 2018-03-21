import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n'

export default class RedisCommander extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        context.i18n.register('RedisCommander', translations);

        this.RedisCommander = context.loadComponent({
            serviceName: 'redis-commander',
            moduleName: 'redis-commander-main',
            jsFileName: 'main-bundle'
        });
    }

    render() {
        this.context.setPageTitle(this.context.i18n.getMessage('RedisCommander.page.title'));

        return <this.RedisCommander basePath="/redis" />;
    }
}
