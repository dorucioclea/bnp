import React from 'react';
import { Containers, Components } from '@opuscapita/service-base-ui';
import { Route } from 'react-router';

import Welcome from './Welcome';
import BuyerDashboard from './BuyerDashboard';
import BuyerInformation from './BuyerInformation';
import SellerDashboard from './SellerDashboard';
import SupplierInformation from './SupplierInformation';
import SupplierRegistrationForm from './SupplierRegistrationForm';
import SupplierDirectory from './SupplierDirectory';
import UserList from './Admin/UserList';
import UserEditor from './Admin/UserEditor';
import AclEditor from './Admin/AclEditor';
import CustomerList from './Admin/CustomerList';
import CustomerEditor from './Admin/CustomerEditor';
import SupplierList from './Admin/SupplierList';
import SupplierEditor from './Admin/SupplierEditor';

class Dispatcher extends Components.ContextComponent
{
    componentWillMount()
    {
        const { userData, userProfile, router } = this.context;
        const { supplierid, customerid, roles } = userData;

        if(supplierid && userProfile.showWelcomePage)
            router.push('/bnp/welcome');
        else if(supplierid)
            router.push('/bnp/sellerDashboard');
        else if (customerid)
            router.push('/bnp/buyerDashboard');
        else if(roles.indexOf('admin') === -1)
            router.push('/bnp/supplierRegistration');
        else if(roles.indexOf('admin') > -1)
            router.push('/bnp/users')

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
                <Route path="/buyerInformation" component={BuyerInformation} />
                <Route path="/sellerDashboard" component={SellerDashboard} />
                <Route path="/supplierInformation" component={SupplierInformation} />
                <Route path="/supplierRegistration" component={SupplierRegistrationForm} />
                <Route path="/supplierDirectory" component={SupplierDirectory} />
                <Route path="/users" component={UserList} />
                <Route path="/users/:userId" component={UserEditor} />
                <Route path="/permissions(/:roleId)" component={AclEditor} />
                <Route path="/customers" component={CustomerList} />
                <Route path="/customers/:customerId" component={CustomerEditor} />
                <Route path="/suppliers" component={SupplierList} />
                <Route path="/suppliers/:supplierId" component={SupplierEditor} />
            </Containers.ServiceLayout>
        );
    }
}

export default Main;
