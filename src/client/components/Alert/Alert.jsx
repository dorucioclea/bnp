import React from 'react';
import classNames from 'classnames';

/**
 * Draws basic alert message.
 */
export default class Alert extends React.Component {

  static defaultProps = {
    visible: true
  };

  static propTypes = {
    bsStyle: React.PropTypes.oneOf(['info', 'danger', 'warning']).isRequired,
    message: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool,
    hideCloseLink: React.PropTypes.bool
  };

  state = {
    visible: this.props.visible
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    });
  }

  render() {
    let _this = this;
    if (_this.state.visible) {
      return (
        <div className={classNames(['bs-callout', `bs-callout-${_this.props.bsStyle}`])}>
          {_this.props.hideCloseLink && <button type='button' className='close' onClick={_this.__handleAlertDismiss__}>
            <span aria-hidden='true'>&times;</span>
            <span className='sr-only'>Close</span>
          </button>}
          <span>{_this.props.message}</span>
        </div>
      );
    }

    return null;
  }

  __handleAlertDismiss__ = () => {
    this.setState({visible: false});
    if (this.props.alertClose) {
      this.props.alertClose();
    }
  };
};
