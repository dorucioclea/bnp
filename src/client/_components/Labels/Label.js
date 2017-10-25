import React from 'react';
import LabelTooltip from './LabelTooltip.js';

/**
 * Label - <objectName>.<fieldName>.label
 * Tooltip - <objectName>.<fieldName>.tooltip
 */
export default class Label extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    objectName: React.PropTypes.string.isRequired,
    fieldName: React.PropTypes.string.isRequired,
    isRequired: React.PropTypes.bool,
    hideTooltip: React.PropTypes.bool
  };

  static contextTypes = {
    i18n: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    hideTooltip: false,
    isRequired: false
  };

  render() {
    const { className, objectName, fieldName, hideTooltip } = this.props;
    let label = this.context.i18n.getMessage(`${objectName}.${fieldName}.label`);

    const tooltipCode = `${objectName}.${fieldName}.tooltip`;
    const tooltip = this.context.i18n.getMessage(tooltipCode);

    if (this.props.isRequired) {
      let lastWord = label.substring(label.lastIndexOf(' ') + 1, label.length);
      label = (
        <span>
          {label.replace(lastWord, '')}<span><nobr>{lastWord} *</nobr></span>
        </span>
      );
    }

    return (
      <label className={className} style={{ paddingLeft: 0 }}>
        {label}
        {!hideTooltip && tooltip && (tooltip !== tooltipCode) &&
        <LabelTooltip
          className='pull-right'
          label={label}
          tooltip={tooltip}
        />
        }
      </label>
    )
  }
}
