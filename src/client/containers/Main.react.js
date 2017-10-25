import React from 'react';
import { Containers, Components } from '@opuscapita/service-base-ui';
import { Route } from 'react-router';

import Welcome from './Welcome';
import BuyerDashboard from './BuyerDashboard';
import SellerDashboard from './SellerDashboard';
import SupplierApplicationForm from './SupplierApplicationForm';
import SupplierRegistrationForm from './SupplierRegistrationForm';
import SupplierDirectory from './SupplierDirectory';

class Dispatcher extends Components.ContextComponent
{
    componentWillMount()
    {
        const { userData, userProfile, router } = this.context;
        const { supplierid, customerid, roles } = userData;

        if(userProfile.showWelcomePage)
            router.push('/bnp/welcome');
        else if(supplierid)
            router.push('/bnp/sellerDashboard');
        else if (customerid)
            router.push('/bnp/buyerDashboard');
        else if(roles.indexOf('admin') === -1)
            router.push('/bnp/supplierRegistration');
    }

    render()
    {
        return(<div>{this.props.children}</div>)
    }
}

class Main extends React.Component
{
    render()
    {
        return(
            <Containers.ServiceLayout serviceName="bnp">
                <Route path="/" component={Dispatcher} />
                <Route path="/welcome" component={Welcome} />
                <Route path="/buyerDashboard" component={BuyerDashboard} />
                <Route path="/sellerDashboard" component={SellerDashboard} />
                <Route path="/supplierInformation" component={SupplierApplicationForm} />
                <Route path="/supplierRegistration" component={SupplierRegistrationForm} />
                <Route path="/supplierDirectory" component={SupplierDirectory} />
            </Containers.ServiceLayout>
        );
    }
}

export default Main;
