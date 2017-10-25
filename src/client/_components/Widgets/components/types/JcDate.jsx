import React from 'react';
import DatePicker from './../datepicker/DatePicker.jsx';

import MinValidator from './../model/validation/MinValidator';
import MaxValidator from './../model/validation/MaxValidator';
import { DateComparator } from './../model/validation/Comparator';
import DateConverter from 'opuscapita-i18n/lib/converters/DateConverter';
import utils from 'underscore';

import JcBaseInput from './JcBaseInput.jsx';

export default class JcDate extends JcBaseInput {
  static contextTypes = {
    locale: React.PropTypes.string,
    i18n: React.PropTypes.object
  };

  static propTypes = {
    name: React.PropTypes.string,
    options: React.PropTypes.array,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.instanceOf(Date)
    ]),
    from: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.instanceOf(Date)
    ]),
    to: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.instanceOf(Date)
    ]),
    onChange: React.PropTypes.func,
    onErrors: React.PropTypes.func,
    valueLink: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  onChangeHandler(newValue) {
    if (this.props.valueLink) {
      this.props.valueLink.requestChange(newValue);
    } else if (this.props.onChange) {
      this.props.onChange(newValue, this.props.id);
    }
  }

  convertValueToDate(value) {
    let date = value || null;
    try {
      if (date && utils.isString(date)) {
        date = this.getDateConverter().toObject(date);
      }
    } catch (e) {
      console.log('Converting value to date error');
    }

    return date;
  }

  _isValidValue = value => {
    if (utils.isString(value)) {
      let date = new Date(value);
      return !utils.isNaN(date.getTime());
    }

    return true;
  };

  getUIValue() {
    let value = null;
    if (this.props.valueLink !== undefined) {
      value = this.convertValueToDate(this.props.valueLink.value);
    } else if (this.props.value !== undefined) {
      value = this.convertValueToDate(this.props.value);
    }

    if (!this._isValidValue(value)) {
      let errors = new Errors();
      errors.rejectValue(this.fieldName, 'error.parse.value', { value: value });
      this.onErrorsHandler(errors, value);
      return value;
    }

    if (utils.isString(value)) {
      return value;
    }

    return this.converter().valueToString(value);
  }

  converter() {
    let format = this.context.i18n.dateFormat;
    return new DateConverter(format, this.context.locale);
  }

  validators(props) {
    let result = [];

    let from = this.convertValueToDate(props.from);
    let to = this.convertValueToDate(props.to);

    if (from !== null) {
      result.push(new MinValidator(from, DateComparator));
    }

    if (to !== null) {
      result.push(new MaxValidator(to, DateComparator));
    }

    return result;
  }

  getOptions() {
    return this.props.options.map((option) => {
      return this.convertValueToDate(option);
    });
  }

  renderInput(props) {
    let locale = this.context.locale;
    let format = this.context.i18n.dateFormat;

    let options = {};
    if (this.props.from) {
      options.startDate = this.convertValueToDate(this.props.from);
    }

    if (this.props.to) {
      options.endDate = this.convertValueToDate(this.props.to);
    }

    return (
      <DatePicker
        format={format}
        locale={locale}
        disabled={this.props.disabled}
        valueLink={this.valueLink()}
        options={options} {...props}
      />
    );
  }
}
