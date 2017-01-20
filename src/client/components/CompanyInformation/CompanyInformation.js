import React from 'react';

export default class CompanyInformation extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/companyInformation.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
