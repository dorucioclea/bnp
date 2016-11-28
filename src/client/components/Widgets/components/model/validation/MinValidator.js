import Validator from './Validator';

export const ERROR_CODE = 'error.property.min.notmet';

export default class MinValidator extends Validator {
  constructor(min, ComparatorClass, errorCode) {
    super();

    this._minValue = min;
    this._comparator = new ComparatorClass();
    this._errorCode = errorCode || ERROR_CODE;
  }

  validate(valueModel, errors) {
    if (this._minValue && valueModel.value && this._comparator.compare(this._minValue, valueModel.value) === 1) {
      errors.rejectValue(valueModel.fieldName, this._errorCode, { value: valueModel.uiValue, min: this._minValue });
    }
  }

  set min(newValue) {
    this._minValue = newValue;
  }
}
