let ApplicationFormConfirmation = {};
ApplicationFormConfirmation.unsavedChanges = 'Sie haben Ihre Einträge nicht gespeichert. ' +
  'Wenn Sie fortfahren, gehen diese verloren. Wollen Sie ohne zu speichern fortfahren?';

let ApplicationFormTab = {};
ApplicationFormTab.company = 'Unternehmen';
ApplicationFormTab.address = 'Adressen';
ApplicationFormTab.contact = 'Ansprechpartner';
ApplicationFormTab.bankAccount = 'Bankkonten';
ApplicationFormTab.financials = 'Finanzdaten';
ApplicationFormTab.certification = 'Nachweise';
ApplicationFormTab.classificationGroup = 'Warengruppen';
ApplicationFormTab.logistics = 'Logistik';
ApplicationFormTab.misc = 'Weiteres';
ApplicationFormTab.rating = 'Bewertung';
ApplicationFormTab.catalogsAndContracts = 'Kontrakte';
ApplicationFormTab.userAccessApproval = 'Zugriffsberechtigung';

let ApplicationFormButton = {};
ApplicationFormButton.return = 'Nachbesserung anfordern';
ApplicationFormButton.sendToCustomer = 'Bearbeitung abschlie\u00dfen und um Freigabe bitten';
ApplicationFormButton.sendToCustomerConfirmation = 'Wollen Sie die Bearbeitung Ihrer Daten wirklich ' +
  'abschlie\u00dfen? Sobald Sie die Daten zur Freigabe senden, ist keine weitere Bearbeitung mehr m\u00f6glich!';
ApplicationFormButton.backToList = 'Zur\u00fcck zur \u00dcbersicht';
ApplicationFormButton.backToServiceConfig = 'Zur\u00fcck zur Service-Konfiguration';

let ApplicationFormLabel = {
  rejectionReason: {}
};
ApplicationFormLabel.rejectionReason.label = 'Bitte geben Sie hier die Gr\u00FCnde an, ' +
  'weshalb Sie die Lieferantendaten nicht genehmigen';
ApplicationFormLabel.ok = 'OK';
ApplicationFormLabel.icotermsDescription = 'Beschreibung der Incoterms';
ApplicationFormLabel.graphic = 'Grafik';
ApplicationFormLabel.successSendToCustomer = "Sie haben Ihre Unternehmensdaten " +
  "erfolgreich bearbeitet. Sobald die Freigabe erfolgt ist, werden Sie per E-Mail darüber informiert.";

let ApplicationFormHeader = {};
ApplicationFormHeader.rejectionReason = 'Grund der Ablehnung';

let ApplicationFormLink = {};
ApplicationFormLink.header = 'In diesem Abschnitt können Sie die ' +
  'allgemeinen Lieferbedingungen für unsere Läger herunterladen.';
ApplicationFormLink.ladenbau = 'Allgemeine Lieferbedingungen Ladenbau';
ApplicationFormLink.regional = 'Allgemeine Lieferbedingungen Regional- und Zentralläger';
ApplicationFormLink.graphic = 'Diese ${separation} verdeutlicht die Bedeutung der Incoterms.';

export default {
  ApplicationFormConfirmation: ApplicationFormConfirmation,
  ApplicationFormTab: ApplicationFormTab,
  ApplicationFormButton: ApplicationFormButton,
  ApplicationFormLabel: ApplicationFormLabel,
  ApplicationFormHeader: ApplicationFormHeader,
  ApplicationFormLink: ApplicationFormLink
}
