# Supplier Directory

## Prerequisite
User is registered to Business Network and tenant is type `Customer`.

## Simple Supplier Search
Inititally the search results is an empty table. The user can enter any text or mulitple texts seperated by spaces and suppliers will be searched based on:
- supplier Name
- city of registration
- comercial registration number
- tax identification number
- VAT identification number
- DUNS number
- Global location number

If no text is given and search button is clicked, all suppliers are displayed.

The search results are displayed in a table, with the following columns:
- Company name
- Country of registration
- Company registration number
- City of registration
- Tax identification number
- VAT identification number
- Global Location number
- D-U-N-S number

The table is paginated and sortable, and each column can be sorted in ascending and descending order.

### Menu Item
The supplier directory is accessible from the buyer's menu, under `Suppliers -> Supplier Directory`

### Technical details
The search is performed in the backend, using MySQL FULLTEXT indexing and searching See [tutorial](http://www.mysqltutorial.org/mysql-full-text-search.aspx).
