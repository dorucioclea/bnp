import React from 'react';
import {Components} from '@opuscapita/service-base-ui';

class PeppolMonitorDetail extends Components.ContextComponent {

  constructor(props, context) {

    super(props);

    this.PeppolMonitorDetail = context.loadComponent({
      serviceName: 'peppol-monitor',
      moduleName: 'peppol-monitor',
      jsFileName: 'peppol-monitor-detail-bundle'
    });
  }

  handleBackClick = () => this.context.router.push('/bnp/peppolMonitor');

  render() {
    return (
      <div>
        <button className='btn btn-default' onClick={() => this.handleBackClick()}>
          <span className="icon glyphicon glyphicon-chevron-left" />&nbsp;
        </button>
        <this.PeppolMonitorDetail messageId={this.props.params.messageId}/>
      </div>
    )
  }
}

export default PeppolMonitorDetail;
