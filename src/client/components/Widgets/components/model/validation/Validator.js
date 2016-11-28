// import MaxLengthValidator  from './MaxLengthValidator'
// import RequiredValidator  from './RequiredValidator'
//
// export const BASIC_VALIDATORS = {
//   maxLength: function(maxLength) {
//     return new MaxLengthValidator(maxLength);
//   },
//   required: function() {
//     return new RequiredValidator();
//   }
// };

/**
 * Base validator
 *
 * @author Dmitry Divin
 */
export default class Validator {
  /**
   * Validate value model
   *
   * @param valueModel - value model
   * @param errors - target errors
   */
  validate(valueModel, errors) {
    throw 'not implemented yet';
  }
}
