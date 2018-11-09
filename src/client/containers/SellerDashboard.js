import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';
import './SellerDashboard.css';

class SellerDashboard extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        context.i18n.register('SellerDashboard', translations);

        this.SupplierProfileStrength = context.loadComponent({
            serviceName: 'supplier',
            moduleName: 'supplier-profile_strength',
            jsFileName: 'profile_strength-bundle'
        });

        this.ConnectionsOverview = context.loadComponent({
            serviceName: 'business-link',
            moduleName: 'business-link-overview',
            jsFileName: 'overview-bundle'
        });

        this.NotificationList = context.loadComponent({
            serviceName: 'notification',
            moduleName: 'notificationList',
            jsFileName: 'notificationList-bundle'
        });
    }

    handleProfileClick()
    {
        this.context.router.push('/bnp/supplierInformation');
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
                        <this.ConnectionsOverview
                          key='connections'
                          supplierId={userData.supplierid}
                          onInvoiceClick={() => this.context.router.push('/bnp/connections')}
                          onPurchaseOrderClick={() => this.context.router.push('/bnp/connections')}
                          onCatalogClick={() => this.context.router.push('/bnp/connections')}
                        />
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
