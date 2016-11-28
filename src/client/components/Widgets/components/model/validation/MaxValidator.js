import Validator from './Validator';

export const ERROR_CODE = 'error.property.max.exceeded';

export default class MaxValidator extends Validator {
  constructor(max, ComparatorClass, errorCode) {
    super();

    this._maxValue = max;
    this._comparator = new ComparatorClass();
    this._errorCode = errorCode || ERROR_CODE;
  }

  validate(valueModel, errors) {
    if (this._maxValue && valueModel.value && this._comparator.compare(this._maxValue, valueModel.value) === -1) {
      errors.rejectValue(valueModel.fieldName, this._errorCode, { value: valueModel.uiValue, max: this._maxValue });
    }
  }

  set max(newValue) {
    this._maxValue = newValue;
  }
}
