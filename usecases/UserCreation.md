# User Creation

## Prerequisite
User is registered to Business Network with role `admin`, `supplier-admin` or `customer-admin`.

## Definition
Tenant: refers to either a Supplier or Customer

## User Creation for Admin Role
There are three ways to create a user:
- from users list page
- from supplier list page
- from customer list page

### Creating User from the User List Page
Admin user sees a menu Admin->Users. This will show the list of all users in BNP. Admin sees a `Create User` button on the top right hand corner of page.

On clickin the button, the page is redirected to a page to choose the supplier or customer which the user will be associated to, using autocomplete input fields. There is an associated `Create User` button on each autocomplete field which is disabled by default, and enabled only when a tenant is chosen.

Clicking the button redirects to the user creation page for the tenant, where the user creation form can be filled.

### Creating User from the Tenant List Page
Admin user sees menus Admin->Suppliers and Admin->Customers. This will show the list of all tenants in BNP respectively. Admin sees a `Create User` button for each tenant in the list.

Clicking the button redirects to the user creation page for the tenant, where the user creation form can be filled.

## User Creation for Tenant Admin Role
Tenant admin user sees a menu Company->Users. This will show the list of all users belonging to the tenant. Tenant admin user sees a `Create User` button on the top right hand corner of page.

Clicking the button redirects to the user creation page for the tenant, where the user creation form can be filled.
