import React from 'react';
import { Components } from '@opuscapita/service-base-ui';

class SFTPEdit extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        this.SFTPForm = context.loadComponent({
            serviceName: 'routing',
            moduleName: 'routing-sftpform'
        });
    }

    render() {
        return <dev>
            <this.SFTPForm />
        </dev>
    }
}

export default SFTPEdit;
