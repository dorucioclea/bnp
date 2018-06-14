import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';
import request from 'superagent-bluebird-promise';

class SellerDashboard extends Components.ContextComponent
{
    static propTypes = {
        currentUserData: PropTypes.object
    };

    state = {
        connectStatus: 'Loading...'
    };

    constructor(props, context)
    {
        super(props);

        context.i18n.register('SellerDashboard', translations);

        const serviceRegistry = (service) => ({ url : '/supplier' });

        this.SupplierProfileStrength = context.loadComponent({
            serviceName: 'supplier',
            moduleName: 'supplier-profile_strength',
            jsFileName: 'profile_strength-bundle'
        });

        this.NotificationList = context.loadComponent({
            serviceName: 'notification',
            moduleName: 'notificationList',
            jsFileName: 'notificationList-bundle'
        });
    }

    componentDidMount()
    {
        const { userData } = this.context;
        const einvoiceRequest = request.get(`/einvoice-send/api/config/inchannels/${userData.supplierid}`);

        /* Do not use cache in request if browser is IE */
        if(!!document.documentMode)
            einvoiceRequest.query({ cachebuster: Date.now().toString() });

        einvoiceRequest.then(response =>
        {
            if(response.body.status === 'activated')
            {
                this.setState({ connectStatus: 'Connected' });
            }
            else
            {
                this.setState({ connectStatus: 'Connecting' });
            }
        })
        .catch(err => this.setState({ connectStatus: 'Not Connected' }));
    }

    handleProfileClick()
    {
        this.context.router.push('/bnp/supplierInformation');
    }

    handleConnectionClick()
    {
        this.context.router.push('/einvoice-send/customer-connections');
    }

    connectButton()
    {
        if(this.state.connectStatus === 'Connected') return '';

        return(<button className="btn btn-warning" onClick={() => this.handleConnectionClick()}>{this.context.i18n.getMessage('SellerDashboard.connections.connect')}</button>);
    }

    connectionStatus()
    {
        const { connectStatus } = this.state;
        const { i18n } = this.context;

        if(connectStatus === 'Not Connected') return i18n.getMessage('SellerDashboard.connections.notConnectedStatus');
        else if(connectStatus === 'Connecting') return i18n.getMessage('SellerDashboard.connections.connectingStatus');
        else if(connectStatus === 'Connected') return i18n.getMessage('SellerDashboard.connections.connectedStatus');
        else return i18n.getMessage('SellerDashboard.connections.loading');
    }

    colorStyle()
    {
        const { connectStatus } = this.state;

        if(connectStatus === 'Loading...')
            return { color: 'black' };
        else if(connectStatus === 'Connected')
            return { color: 'green' };
        else
            return { color: 'red' };
    }

    render()
    {
        const { i18n, userData } = this.context;
        this.context.setPageTitle(i18n.getMessage('SellerDashboard.page.title'));

        return(
            <div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="panel panel-success">
                      <div className="panel-heading">
                        <h4>{i18n.getMessage('SellerDashboard.profileStrength.heading')}</h4>
                      </div>
                      <div className="panel-body">
                        <div className="col-md-6">
                          <this.SupplierProfileStrength
                            key='profile_strength'
                            actionUrl="/"
                            supplierId={userData.supplierid}
                          />
                        </div>
                        <div className="col-md-6">
                          <p>{i18n.getMessage('SellerDashboard.profileStrength.content')}</p>
                          <button className="btn btn-warning" onClick={() => this.handleProfileClick()}>
                            {i18n.getMessage('SellerDashboard.profileStrength.editButton')}
                          </button>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="panel panel-success">
                      <div className="panel-heading">
                        <h4>{i18n.getMessage('SellerDashboard.connections.heading')}</h4>
                      </div>
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-md-4">
                            <span className="fa-stack fa-lg">
                              <i className="fa fa-circle fa-stack-2x" style={this.colorStyle()}></i>
                              <i className="fa fa-power-off fa-stack-1x fa-inverse"></i>
                            </span>
                          </div>
                          <div className="col-md-4">
                            <h4>eInvoice</h4>
                            <i style={this.colorStyle()}>{this.connectionStatus()}</i>
                          </div>
                          <div className="col-md-4">{this.connectButton()}</div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <br/>
                            <p>{i18n.getMessage('SellerDashboard.connections.content')}</p>
                            <br/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="panel panel-success">
                      <div className="panel-heading">
                        <h4>{i18n.getMessage('SellerDashboard.notification.heading')}</h4>
                      </div>
                      <div className="panel-body">
                          <div className="col-md-12">
                              <this.NotificationList itemsPerPage="10" poll="true" className="sellerdashboard-notification-list" />
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        )
    }
}

export default SellerDashboard;
