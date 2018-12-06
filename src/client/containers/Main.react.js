import React from 'react';
import { Containers, Components } from '@opuscapita/service-base-ui';
import { Route } from 'react-router';

import BuyerDashboard from './BuyerDashboard';
import BuyerInformation from './BuyerInformation';
import SellerDashboard from './SellerDashboard';
import SupplierInformation from './SupplierInformation';
import SupplierRegistrationForm from './SupplierRegistrationForm';
import SupplierDirectory from './SupplierDirectory';
import UserList from './Admin/UserList';
import UserEditor from './Admin/UserEditor';
import AclEditor from './Admin/AclEditor';
import CustomerCreate from './Admin/CustomerCreate';
import CustomerList from './Admin/CustomerList';
import CustomerEditor from './Admin/CustomerEditor';
import SupplierCreate from './Admin/SupplierCreate';
import SupplierList from './Admin/SupplierList';
import SupplierEditor from './Admin/SupplierEditor';
import UserSelectCreate from './Admin/UserSelectCreate';
import UserCreate from './Admin/UserCreate';
import BusinessLinkList from './Admin/BusinessLinkList';
import BusinessLinkEditor from './Admin/BusinessLinkEditor';
import CatalogList from './Admin/CatalogList';
import CatalogEditor from './Admin/CatalogEditor';
import RedisCommander from './Admin/RedisCommander';
import CatalogUpload from './CatalogUpload';
import CredentialEdit from './Admin/Routing/CredentialEdit';
import DeliveryConfigEdit from './Admin/Routing/DeliveryConfigEdit';
import DeliveryNodeEdit from './Admin/Routing/DeliveryNodeEdit';
import RecordList from './Admin/Routing/RecordList';
import RouteList from './Admin/Routing/RouteList';
import RouteEdit from './Admin/Routing/RouteEdit';
import BusinessLinkConnections from './BusinessLinkConnections';

class Dispatcher extends Components.ContextComponent
{
    componentWillMount()
    {
        const { userData, userProfile, router } = this.context;
        const { supplierid, customerid, roles } = userData;

        if(supplierid)
            router.push('/bnp/sellerDashboard');
        else if (customerid)
            router.push('/bnp/buyerDashboard');
        else if(roles.indexOf('admin') === -1)
            router.push('/bnp/supplierRegistration');
        else if(roles.indexOf('admin') > -1)
            router.push('/bnp/users');
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
                <Route path="/buyerDashboard" component={BuyerDashboard} />
                <Route path="/buyerInformation" component={BuyerInformation} />
                <Route path="/sellerDashboard" component={SellerDashboard} />
                <Route path="/supplierInformation" component={SupplierInformation} />
                <Route path="/supplierRegistration" component={SupplierRegistrationForm} />
                <Route path="/supplierDirectory" component={SupplierDirectory} />
                <Route path="/userSelectCreate" component={UserSelectCreate} />
                <Route path="/users" component={UserList} />
                <Route path="/users/:userId" component={UserEditor} />
                <Route path="/routing" component={RecordList} />
                <Route path="/routing/credentials/:credentialId" component={CredentialEdit} />
                <Route path="/routing/deliverynodes/:deliveryNodeId" component={DeliveryNodeEdit} />
                <Route path="/routing/deliveryconfigs/:deliveryConfigId" component={DeliveryConfigEdit} />
                <Route path="/routing/routes" component={RouteList} />
                <Route path="/routing/routes/:routeId" component={RouteEdit} />
                <Route path="/permissions(/:roleId)" component={AclEditor} />
                <Route path="/redis" component={RedisCommander} />
                <Route path="/redis/*" component={RedisCommander} />
                <Route path="/customers" component={CustomerList} />
                <Route path="/customers/new" component={CustomerCreate} />
                <Route path="/customers/:customerId" component={CustomerEditor} />
                <Route path="/customers/:customerId/createUser" component={UserCreate} />
                <Route path="/suppliers" component={SupplierList} />
                <Route path="/suppliers/new" component={SupplierCreate} />
                <Route path="/suppliers/:supplierId" component={SupplierEditor} />
                <Route path="/suppliers/:supplierId/createUser" component={UserCreate} />
                <Route path="/catalog-upload" component={CatalogUpload} />
                <Route path="/connections" component={BusinessLinkConnections} />
                <Route path="/businesslinks" component={BusinessLinkList} />
                <Route path="/businesslinks/new" component={BusinessLinkEditor} />
                <Route path="/businesslinks/:businessLinkId" component={BusinessLinkEditor} />
                <Route path="/catalogs" component={CatalogList} />
                <Route path="/catalogs/new" component={CatalogEditor} />
                <Route path="/catalogs/:customerId" component={CatalogEditor} />
            </Containers.ServiceLayout>
        );
    }
}

export default Main;
