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

validatejs.doesnt.match.message = "Value does not match the required pattern '{pattern}'";
validatejs.invalid.url.message = "Not a valid URL format";
validatejs.invalid.creditCard.message = "Not a valid credit card number format";
validatejs.invalid.email.message = "Not a valid e-mail address format";
validatejs.invalid.range.message = "Value is not in the valid range of '{from}' to '{to}'";
validatejs.invalid.size.message = "Value is not in the valid size range of '{from}' to '{to}'";
validatejs.invalid.max.message = "Value exceeds maximum value '{maxValue}'";
validatejs.invalid.min.message = "Value is less than minimum value '{minValue}'";
validatejs.invalid.maxOrEqual.message = "Value must be less than or equal to max value '{maxValue}'";
validatejs.invalid.minOrEqual.message = "Value must be greater than or equal to min value '{minValue}'";
validatejs.invalid.maxSize.message = "Value exceeds the maximum size of '{maxSize}'";
validatejs.invalid.maxLength.message = "Value exceeds the maximum length of '{maxSize}'";
validatejs.invalid.minSize.message = "Value is less than the minimum size of '{minSize}'";
validatejs.invalid.validator.message = "Value does not pass custom validation";
validatejs.not.inlist.message = "Value is not in the list '{list}'";
validatejs.blank.message = "Field cannot be blank";
validatejs.not.equal.message = "Value cannot equal '{value}'";
validatejs.null.message = "Property cannot be null";
validatejs.not.unique.message = "Value must be unique";

validatejs.typeMismatch.java.net.URL = "Value must be a valid URL";
validatejs.typeMismatch.java.net.URI = "Value must be a valid URI";
validatejs.typeMismatch.java.util.Date = "Value must be a valid Date";
validatejs.typeMismatch.java.lang.Double = "Value must be a valid number";
validatejs.typeMismatch.java.lang.Integer = "Value must be a valid number";
validatejs.typeMismatch.java.lang.Long = "Value must be a valid number";
validatejs.typeMismatch.java.lang.Short = "Value must be a valid number";
validatejs.typeMismatch.java.math.BigDecimal = "Value must be a valid number";
validatejs.typeMismatch.java.math.BigInteger = "Value must be a valid number";

export default {
  validatejs
};
