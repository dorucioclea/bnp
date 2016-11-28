export class FieldError {
  constructor(fieldName, errorCode, errorArgs) {
    this.fieldName = fieldName;
    this.errorCode = errorCode;
    this.errorArgs = errorArgs;
  }
}

export default class Errors {
  constructor() {
    this._globalErrors = [];
    this._fieldErrors = {};
  }

  get globalErrors() {
    return this._globalErrors;
  }

  get fieldErrors() {
    let allErrors = [];
    for (let fieldName in this._fieldErrors) {
      if (this._fieldErrors.hasOwnProperty(fieldName)) {
        for (let error of this._fieldErrors[fieldName]) {
          allErrors.push(error);
        }
      }
    }

    return allErrors;
  }

  get allErrors() {
    let errors = this.fieldErrors;
    for (let error of this.globalErrors) {
      errors.push(error);
    }

    return errors;
  }

  clear() {
    this._globalErrors = [];
    this._fieldErrors = {};
  }

  addAllErrors(errors) {
    for (let error of errors.allErrors) {
      if (error.fieldName === undefined) {
        this.reject(error.errorCode, error.errorArgs);
      } else {
        this.rejectValue(error.fieldName, error.errorCode, error.errorArgs);
      }
    }
  }

  getFieldErrors(fieldName) {
    return this._fieldErrors[fieldName] || [];
  }

  reject(errorCode, errorArgs) {
    this._globalErrors.push(new FieldError(null, errorCode, errorArgs || {}));
  }

  rejectValue(fieldName, errorCode, errorArgs) {
    let errors = this._fieldErrors[fieldName] || [];
    errors.push(new FieldError(fieldName, errorCode, errorArgs || {}));

    this._fieldErrors[fieldName] = errors;
  }

  hasFieldErrors(fieldName) {
    if (fieldName === undefined || fieldName === null) {
      return this.fieldErrors.length !== 0;
    }

    return this._fieldErrors[fieldName] !== undefined;
  }

  hasGlobalErrors() {
    return this._globalErrors.length !== 0;
  }

  hasErrors() {
    return this.hasGlobalErrors() || this.hasFieldErrors(null);
  }
}
