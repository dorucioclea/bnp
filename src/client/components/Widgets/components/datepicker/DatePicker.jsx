import utils from 'underscore';
import datepicker from './bootstrap-datepicker';
import './bootstrap-datepicker-i18n';

import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

export default class DatePicker extends React.Component {

  _initProps = (props) => {
    this.locale = props.locale || 'en';

    let format = props.format || 'dd/MM/yyyy';

    //normalize format from Java to bootstrap-datepicker
    this.format = format.replace(/M{2}/g, 'mm').replace('mmmm', 'MM');

    this.options = props.options || {};
  };

  constructor(props) {
    super(props);
    this._initProps(props);
    this._changeRange();
  }

  componentWillReceiveProps(newProps) {
    this.props = newProps;
    this._initProps(newProps);
    this._changeRange();
  }

  static propTypes = {
    showIcon: React.PropTypes.bool
  };

  static defaultProps = {
    showIcon: true
  };

  prepareOptions() {
    let defaultOptions = {
      autoclose: true,
      todayHighlight: true,
      todayBtn: 'linked',
      language: this.locale,
      format: this.format,
      forceParse: false,
      showAnim: 'fold',
      showButtonPanel: true,
      clearBtn: true,
      disabled: this.props.disabled
    };

    return utils.extend(defaultOptions, this.options);
  }

  componentDidMount() {
    let input = ReactDOM.findDOMNode(this.refs.input);
    this.dateElement = input;
    if (this.props.showIcon) {
      this.dateElement = this.refs.group;
    }

    jQuery(this.dateElement)
      .datepicker(this.prepareOptions())
      .on('changeDate', () => {
        // fire event to change date
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        input.dispatchEvent(event);
      });
  }

  _changeRange = () => {
    jQuery(this.dateElement).datepicker('setStartDate', this.options.startDate ? this.options.startDate : false);
    jQuery(this.dateElement).datepicker('setEndDate', this.options.endDate ? this.options.endDate : false);
  };

  componentWillUnmount() {
    jQuery(this.dateElement).datepicker('remove');
  }

  render() {
    let element = (<input {...this.props} ref="input"/>);
    if (this.props.showIcon && !this.props.disabled) {
      return (
        <div className="input-group date" ref="group">
          {element}
          <span className="input-group-addon">
            <span className="glyphicon glyphicon-calendar"></span>
          </span>
        </div>
      );
    } else {
      return element;
    }
  }
}
