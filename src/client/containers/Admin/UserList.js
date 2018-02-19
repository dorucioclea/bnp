
import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n'
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class UserList extends Components.ContextComponent {

    constructor(props, context) {

        super(props);

        context.i18n.register('UserAdmin.List', translations);

        const serviceRegistry = (service) => ({ url: `/user` });

        this.UserList = serviceComponent({
            serviceRegistry,
            serviceName: 'user' ,
            moduleName: 'user-list',
            jsFileName: 'list-bundle'
        });
    }

    /**
     * User edit click handler.
     * @param {string} userId User identifier
     */
    handleEdit(userId) {
        this.context.router.push(`/bnp/users/${userId}`);
    }

    handleCreateUserClick() {
        const { router, userData } = this.context;
        if (userData.roles.includes('admin')) {
            router.push(`/bnp/userSelectCreate`);
        } else if (userData.roles.includes('supplier-admin')) {
            router.push(`/bnp/suppliers/${userData.supplierid}/createUser`);
        } else if (userData.roles.includes('customer-admin')) {
            router.push(`/bnp/customers/${userData.customerid}/createUser`);
        } else {
            router.push(`/bnp/users`);
        }
    }

    render() {
        this.context.setPageTitle(this.context.i18n.getMessage('UserList.page.title'));

        return (
            <div>
                <button className='btn btn-primary pull-right' onClick={this.handleCreateUserClick.bind(this)} >{this.context.i18n.getMessage('UserList.createUser')}</button>
                <h1>{this.context.i18n.getMessage('UserList.head')}</h1>
                <this.UserList onEdit={userId => this.handleEdit(userId)} />
            </div>
        )
    }
}
