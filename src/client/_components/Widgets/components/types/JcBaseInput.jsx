import React from 'react';
import StripToNullConverter from 'opuscapita-i18n/lib/converters/StripToNullConverter';
import ParseError from 'opuscapita-i18n/lib/converters/ParseError';
import utils from 'underscore';
import Errors from './../model/validation/Errors';

export default class JcBaseInput extends React.Component {
  static contextTypes = {
    i18n: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.fieldName = this.props.name || 'default';

    this.state = {
      uiValue: this.getUIValue()
    };
  }

  valueLink() {
    return {
      value: this.state.uiValue,
      requestChange: this.onRequestChangeHandler
    };
  }

  onErrorsHandler(errors, rejectedValue) {
    if (this.props.onErrors) {
      let result = [];
      let i18n = this.context.i18n;

      errors.allErrors.forEach((error) => {
        result.push(i18n.getMessage(error.errorCode, error.errorArgs));
      });

      this.props.onErrors(result, rejectedValue);
    }
  }

  onChangeHandler(newValue) {
    if (this.props.valueLink) {
      this.props.valueLink.requestChange(newValue);
    } else if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  }

  onRequestChangeHandler = (stringValue) => {
    let errors = new Errors();
    let value = null;
    try {
      value = this.converter().stringToValue(stringValue);

      let model = {
        value: value,
        fieldName: this.fieldName
      };
      this.validators(this.props).forEach((validator) => {
        validator.validate(model, errors);
      });
    } catch (e) {
      if (e instanceof ParseError) {
        errors.rejectValue(this.fieldName, e.errorCode, e.errorArgs);
      } else {
        throw e;
      }
    }

    if (errors.hasErrors()) {
      this.onErrorsHandler(errors, stringValue);
    } else {
      this.onChangeHandler(value);
    }

    this.setState({uiValue: stringValue});
  };

  _isValidValue(value) {
    return true;
  }

  getUIValue() {
    let value = null;
    if (this.props.valueLink !== undefined) {
      value = this.props.valueLink.value;
    } else if (this.props.value !== undefined) {
      value = this.props.value;
    }

    if (!this._isValidValue(value)) {
      let errors = new Errors();
      errors.rejectValue(this.fieldName, 'error.parse.value', {value: value});
      this.onErrorsHandler(errors, value);

      return value;
    }

    if (utils.isString(value)) {
      return value;
    }

    return this.converter().valueToString(value);
  }

  shouldValidate(nextProps) {
    return false;
  }

  validators(props) {
    return [];
  }

  converter() {
    return new StripToNullConverter();
  }

  renderInput(props) {
    return (<input type="text" valueLink={this.valueLink()} {...props}/>);
  }

  getOptions() {
    return this.props.options;
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.shouldValidate(nextProps)) {
      let errors = new Errors();
      let value = null;
      try {
        value = this.converter().stringToValue(this.valueLink().value);

        const model = {
          value: value,
          fieldName: this.fieldName
        };

        this.validators(nextProps).forEach((validator) => {
          validator.validate(model, errors);
        });
      } catch (e) {
        if (e instanceof ParseError) {
          errors.rejectValue(this.fieldName, e.errorCode, e.errorArgs);
        } else {
          throw e;
        }
      }

      if (errors.hasErrors()) {
        this.onErrorsHandler(errors, this.valueLink().value);
      } else {
        this.onChangeHandler(value);
      }
    }
  }

  render() {
    let inputProps = utils.omit(this.props, Object.keys(this.constructor.propTypes));
    if (this.props.name) {
      inputProps.name = this.props.name;
    }

    let optionStyle = this.props.optionStyle || {};

    if (this.props.options) {
      let converter = this.converter;

      return (
        <select valueLink={this.valueLink()} {...inputProps}>
          {this.getOptions().map((option, i) => {
              let value = converter.valueToString(option.value);
              return <option key={i} value={value} style={optionStyle}>{option.label}</option>;
            }
          )}
        </select>
      );
    } else {
      return this.renderInput(inputProps);
    }
  }
}
