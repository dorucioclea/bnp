let ApplicationFormConfirmation = {};
ApplicationFormConfirmation.unsavedChanges = 'You did not save your entries. Do you want to proceed without saving?';

let ApplicationFormTab = {};
ApplicationFormTab.company = 'Company';
ApplicationFormTab.address = 'Address';
ApplicationFormTab.contact = 'Contact';
ApplicationFormTab.bankAccount = 'Bank account';
ApplicationFormTab.financials = 'Financials';
ApplicationFormTab.certification = 'Certification';
ApplicationFormTab.classificationGroup = 'Classification group';
ApplicationFormTab.logistics = 'Logistics';
ApplicationFormTab.misc = 'Misc';
ApplicationFormTab.rating = 'Rating';
ApplicationFormTab.catalogsAndContracts = 'Catalogs & Contracts';

let ApplicationFormButton = {};
ApplicationFormButton.return = 'Request data correction';
ApplicationFormButton.sendToCustomer = 'Finish data entry and request approval';
ApplicationFormButton.sendToCustomerConfirmation = 'Do you really want to finish data entry? ' +
  'As soon as you send the data for approval, no more editing will be possible.';
ApplicationFormButton.backToList = 'Back to list';

let ApplicationFormLabel = {
  rejectionReason: {}
};
ApplicationFormLabel.rejectionReason.label = 'Please state your reasons for rejecting data provided by the supplier';
ApplicationFormLabel.ok = 'OK';
ApplicationFormLabel.icotermsDescription = 'Description of Incoterms';
ApplicationFormLabel.graphic = 'graphic';
ApplicationFormLabel.successSendToCustomer = "Entry of data was successful. As soon " +
  "as your data has been approved, you'll be informed via email.";

let ApplicationFormHeader = {};
ApplicationFormHeader.rejectionReason = 'Rejection reason';

let ApplicationFormLink = {};
ApplicationFormLink.header = 'The following section contains the current' +
  ' version of our Warehouse Terms and Conditions.';
ApplicationFormLink.ladenbau = 'General Terms of Delivery for Store Construction Warehouses';
ApplicationFormLink.regional = 'General Terms of Delivery for Regional and Central Warehouses';
ApplicationFormLink.graphic = 'This ${separation} depicts the meaning of the Incoterms.';

export default {
  ApplicationFormConfirmation: ApplicationFormConfirmation,
  ApplicationFormTab: ApplicationFormTab,
  ApplicationFormButton: ApplicationFormButton,
  ApplicationFormLabel: ApplicationFormLabel,
  ApplicationFormHeader: ApplicationFormHeader,
  ApplicationFormLink: ApplicationFormLink
}
