const validatejs = {
  doesnt: {
    match: {}
  },
  invalid: {
    url: {},
    creditCard: {},
    email: {},
    range: {},
    size: {},
    max: {},
    min: {},
    maxOrEqual: {},
    minOrEqual: {},
    maxSize: {},
    maxLength: {},
    minSize: {},
    validator: {}
  },
  not: {
    inlist: {},
    equal: {},
    unique: {}
  },
  blank: {},
  'null': {},
  typeMismatch: {
    java: {
      net: {},
      util: {},
      lang: {},
      math: {}
    }
  }
};

validatejs.doesnt.match.message = "Der Wert entspricht nicht dem vorgegebenen Muster '{pattern}'";
validatejs.invalid.url.message = "Dies ist keine g\u00fcltige URL";
validatejs.invalid.creditCard.message = "Dies ist keine g\u00fcltige Kreditkartennummer";
validatejs.invalid.email.message = "Dies ist keine g\u00fcltige E-Mail-Adresse";
validatejs.invalid.range.message = "Der Wert ist nicht im Wertebereich von ''{from}'' bis ''{to}''";
validatejs.invalid.size.message = "Der Wert ist nicht im Gr\u00f6\u00dfenbereich von ''{from}'' bis ''{to}''";
validatejs.invalid.max.message = "Der Wert ist gr\u00f6\u00dfer als der H\u00f6chstwert von '{maxValue}'";
validatejs.invalid.min.message = "Der Wert ist kleiner als der Mindestwert von '{minValue}'";
validatejs.invalid.maxOrEqual.message = "Der Wert muss kleiner als oder gleich dem Maximalwert '{maxValue}' sein";
validatejs.invalid.minOrEqual.message = "Der Wert muss gr\u00f6ßer als oder gleich dem Minimalwert '{minValue}' sein";
validatejs.invalid.maxSize.message = "Der Wert \u00fcbersteigt den H\u00f6chstwert von '{maxSize}'";
validatejs.invalid.maxLength.message = "Value exceeds the maximum length of '{maxSize}'";
validatejs.invalid.minSize.message = "Der Wert unterschreitet den Mindestwert von '{minSize}'";
validatejs.invalid.validator.message = "Der Wert ist ung\u00fcltig";
validatejs.not.inlist.message = "Der Wert ist nicht in der Liste ''{list}'' enthalten";
validatejs.blank.message = "Das Feld darf nicht leer sein";
validatejs.not.equal.message = "Der Wert darf nicht gleich ''{value}'' sein";
validatejs.null.message = "Die Eigenschaft darf nicht null sein";
validatejs.not.unique.message = "Der Wert muss eindeutig sein";

validatejs.typeMismatch.java.net.URL = "Der Wert muss eine g\u00fcltige URL sein";
validatejs.typeMismatch.java.net.URI = "Der Wert muss eine g\u00fcltige URI sein";
validatejs.typeMismatch.java.util.Date = "Der Wert muss ein g\u00fcltiges Datum sein";
validatejs.typeMismatch.java.lang.Double = "Der Wert muss eine g\u00fcltige Zahl sein";
validatejs.typeMismatch.java.lang.Integer = "Der Wert muss eine g\u00fcltige Zahl sein";
validatejs.typeMismatch.java.lang.Long = "Der Wert muss eine g\u00fcltige Zahl sein";
validatejs.typeMismatch.java.lang.Short = "Der Wert muss eine g\u00fcltige Zahl sein";
validatejs.typeMismatch.java.math.BigDecimal = "Der Wert muss eine g\u00fcltige Zahl sein";
validatejs.typeMismatch.java.math.BigInteger = "Der Wert muss eine g\u00fcltige Zahl sein";

export default {
  validatejs
};
