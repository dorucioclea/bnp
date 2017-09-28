import React from 'react';
import connect from 'react-redux/lib/components/connect';

class UserAccessApproval extends React.Component {
  render() {
    return <div>Implement me!</div>
  }
}

function injectState(store) {
  return {
    currentUserData: store.currentUserData
  };
}

export default connect(injectState)(UserAccessApproval);
