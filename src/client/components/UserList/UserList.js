import React from 'react';
import connect from 'react-redux/lib/components/connect';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

class UserList extends React.Component {

  static contextTypes = {
    i18n: React.PropTypes.object,
    formatPatterns: React.PropTypes.object,
    dateTimePattern: React.PropTypes.string,
    datePattern: React.PropTypes.string,
    simPublicUrl: React.PropTypes.string,
    simUrl: React.PropTypes.string,
    httpResponseHandler: React.PropTypes.func,
    showNotification: React.PropTypes.func,
    hideNotification:  React.PropTypes.func,
    clearNotifications: React.PropTypes.func,
    router: React.PropTypes.object
  };

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `${this.context.simPublicUrl}/user` });

    const UserListComponent = serviceComponent({
      serviceRegistry,
      serviceName: 'user' ,
      moduleName: 'user-list',
      jsFileName: 'list-bundle'
    });

    this.externalComponents = { UserListComponent };
  }

  componentWillUnmount() {
    this.ignoreAjax = true;
  }

  handleUnauthorized = () => this.context.router.push('/login');

  handleEdit = (userId) => this.context.router.push(`/users/${userId}`);

  render() {
    const { UserListComponent } = this.externalComponents;

    return (
      <UserListComponent
        actionUrl={this.context.simPublicUrl}
        onUnauthorized={this.handleUnauthorized}
        onEdit={this.handleEdit}
      />
    )
  }
}

function injectState(store) {
  return {};
}

export default connect(injectState)(UserList);
