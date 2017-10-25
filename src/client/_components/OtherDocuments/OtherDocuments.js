import React from 'react';

export default class OtherDocuments extends React.Component {
  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/otherDocuments.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
