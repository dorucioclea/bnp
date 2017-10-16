import React from 'react';
import connect from 'react-redux/lib/components/connect';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';
import Button from 'react-bootstrap/lib/Button';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import i18nMessages from './i18n';

class UserEditor extends React.Component {

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

  state = {
    isDirty: false,
    tab: 0
  };

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `${this.context.simPublicUrl}/user` });

    const UserProfileEditor = serviceComponent({
      serviceRegistry,
      serviceName: 'user' ,
      moduleName: 'user-profile',
      jsFileName: 'profile-bundle'
    });

    const UserRoleEditor = serviceComponent({
      serviceRegistry,
      serviceName: 'user' ,
      moduleName: 'user-role',
      jsFileName: 'role-bundle'
    });

    this.externalComponents = { UserProfileEditor, UserRoleEditor };
    this.context.i18n.register('UserEditor', i18nMessages);
  }

  handleTabChange = (tab) => {
    if (this.confirmUnsavedChanges()) {
      this.setState({ tab, isDirty: false });
    }
  };

  handleBackClick = () => {
    if (this.confirmUnsavedChanges()) {
      this.context.router.push('/users');
    }
  };

  handleUnauthorized = () => this.context.router.push('/login');

  confirmUnsavedChanges = () => !this.state.isDirty || window.confirm(this.context.i18n.getMessage('UserEditor.UnsavedChangesConfirmation'));

  handleUserChange = () => this.setState({ isDirty: true });

  handleUserUpdate = () => this.setState({ isDirty: false });

  get userId() {
    return decodeURIComponent(this.props.params.userId);
  }

  render() {
    const { UserProfileEditor, UserRoleEditor } = this.externalComponents;
    const i18n = this.context.i18n;

    return (
      <div>
        <Button onClick={this.handleBackClick}>
          <span className="icon glyphicon glyphicon-chevron-left" />
          {i18n.getMessage('UserEditor.Back')}
        </Button>
        <Tabs
          id="userEditorTabs"
          activeKey={this.state.tab}
          onSelect={this.handleTabChange}
          style={{ marginTop: '20px' }}
        >
          <Tab eventKey={0} title={i18n.getMessage('UserEditor.Tabs.Profile')}>
            <UserProfileEditor
              userId={this.userId}
              actionUrl={this.context.simPublicUrl}
              dateTimePattern={this.context.datePattern}
              onUnauthorized={this.handleUnauthorized}
              onChange={this.handleUserChange}
              onUpdate={this.handleUserUpdate}
            />
          </Tab>
          <Tab eventKey={1} title={i18n.getMessage('UserEditor.Tabs.Roles')}>
            <UserRoleEditor
              userId={this.userId}
              actionUrl={this.context.simPublicUrl}
              onUnauthorized={this.handleUnauthorized}
            />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function injectState(store) {
  return {};
}

export default connect(injectState)(UserEditor);
