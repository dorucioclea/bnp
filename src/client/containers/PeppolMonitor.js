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

  goMessageDetail(messageId) {
    this.context.router.push(`/bnp/peppolMonitorDetail/${messageId}`);
  }

  render() {
    return (
      <this.PeppolMonitor goMessageDetail={messageId => this.goMessageDetail(messageId)}/>
    )
  }
}

export default PeppolMonitor;
