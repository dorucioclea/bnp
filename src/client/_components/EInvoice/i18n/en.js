/* eslint-disable */
export default {
  WelcomeTab: {
    welcomeHeader: 'Welcome to OpusCapita page for registration of suppliers for the Business Network Portal.',
    welcomeContent: 'There are some information needed in order to enable your company within the Business Network Portal to start sending eInvoices. Continue registration and Read more under option eInvoice in order to proceed. Fill in required information in order to finalize your registration under Create account. '+
'NCC receives only your eInvoice in SVEfaktura format as stated in SFTI 1.0. Programs for validation are available on this site and can be found under option “eInvoice”. Therefor selection of format is closed.',
    ediAddressHeader: 'EDI address (GLN).',
    ediAddressContent: 'Enter your "EDI address" that is going to be the sending identity. This identity can be a GLN (Global Location Name) or organisation number.',
    nameHeader: 'Name.',
    nameContent: 'Check your company name from previous registration, we need the full company name, f ex "OpusCapita AB".',
    formatHeader: 'Format.',
    formatContent: 'Preset as INVOICE, please be sure you can produce a XML SFTI 1.0 of SVEFAKTURA or SBDH_SVEFAKTURA.. Validation of format will be handled under Validator and is mandatory for all eInvoice sending towards NCC.',
    communicationHeader: 'Communication.',
    communicationContent: 'The Communication to the “Business Network Portal" at OpusCapita may take place through a Value Added Network (VAN) or the file can be sent directly to OpusCapita with FTP. If your are using a VAN please chose your vendor. If using FTP, the contact person you add, will receive information by email on how to send a file with ftp to OpusCapita.',
    contactsHeader: 'Contacts.',
    contactsContent: 'You need to register a contact person for your as a supplier. You need to enter name, e-mail address and phone number.'
  },
  FaqTab: {
    eInvoiceHeader: 'eInvoice.',
    eInvoiceContent: 'The easiest way to submit an invoice! Always 100 % correct data transferred around the clock, all working days – Globally! Connect with your existing service provider for e-invoicing by simply choose your operator from our partner list and we set up your connection in no time. In case of your operator is new to us, OpusCapita takes care of the technical setup with the new operator. We have a global reach as you will be connected to the global and open OpusCapita Business Network.',
    eInvoiceFooter: 'Submit your invoice in SVEfaktura format as stated in SFTI 1.0. Read more about eInvoice and format here.'
  },
  ValidationTab: {
    validationHeader: 'Validation of eInvoice.',
    validationContent1: 'NCC has stated that all incoming eInvoices must be submitted in SVEfaktura format as stated in general guideline for SFTI 1.0. Guidelines and program for validation are available on this site.',
    validationContent2: 'Select your eInvoice and “drag-and-drop” to the space below. A correct mapped eInvoice will be cleared by a receipt.',
    validationContent3: 'When your eInvoice has been approved (validated) the submit button will be activated and you can activate your company for eInvoice sending.'
  }
}
