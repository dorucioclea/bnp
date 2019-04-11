import React from 'react';
import {Components} from '@opuscapita/service-base-ui';

class PeppolMonitor extends Components.ContextComponent {

  constructor(props, context) {
    super(props);

    this.PeppolMonitor = context.loadComponent({
      serviceName: 'peppol-monitor',
      moduleName: 'peppol-monitor-home',
      jsFileName: 'home-bundle'
    });
  }

  render() {
    return (
      <this.PeppolMonitor />
    )
  }
}

export default PeppolMonitor;
