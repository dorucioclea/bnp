import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import translations from '../i18n'

export default class UserEditor extends Components.ContextComponent {

    constructor(props, context) {
        super(props);

        context.i18n.register('UserAdmin.Editor', translations);

        this.UserProfileEditor = context.loadComponent({
            serviceName: 'user',
            moduleName: 'user-profile',
            jsFileName: 'profile-bundle'
        });

        this.UserRoleEditor = context.loadComponent({
            serviceName: 'user',
            moduleName: 'user-role',
            jsFileName: 'role-bundle'
        });

        this.state = {
            isDirty: false,
            tab: 0
        };
    }

    /**
     * Switches to given tab.
     * @param {number} tab Tab index
     */
    handleTabChange = (tab) => {
        this.setState({ tab });
    };

    /**
     * Navigates to user list.
     */
    handleBackClick = () => {
        this.confirmUnsavedChanges(() => this.context.router.push('/bnp/users'));
    };

    /**
     * Displays confirmation dialog once unsaved changes detected.
     * @param {function} onConfirmed Called when users confirms navigation
     */
    confirmUnsavedChanges(onConfirmed) {
        if (this.state.isDirty) {
            this.context.showModalDialog(
                this.context.i18n.getMessage('UserAdmin.Editor.unsavedChangesConfirmation.title'),
                this.context.i18n.getMessage('UserAdmin.Editor.unsavedChangesConfirmation.message'),
                button => button === 'yes' && onConfirmed() || true,
                {
                    yes: this.context.i18n.getMessage('System.yes'),
                    no: this.context.i18n.getMessage('System.no')
                }
            );
        } else {
            onConfirmed();
        }
    }

    /**
     * User changed data handler.
     */
    handleChange() {
        this.setState({ isDirty: true });
    }

    /**
     * Changes data has been saved handler.
     */
    handleUpdate() {
        this.setState({ isDirty: false });
    }

    render() {
        const i18n = this.context.i18n;

        this.context.setPageTitle(i18n.getMessage('UserAdmin.Editor.page.title'));

        return (
            <div>
                <button className='btn btn-default' onClick={() => this.handleBackClick()}>
                    <span className="icon glyphicon glyphicon-chevron-left" />
                    {i18n.getMessage('UserAdmin.Editor.back')}
                </button>
                <Tabs
                    id="userEditorTabs"
                    activeKey={this.state.tab}
                    onSelect={tab => this.handleTabChange(tab)}
                    style={{ marginTop: '20px' }}
                >
                    <Tab eventKey={0} title={i18n.getMessage('UserAdmin.Editor.tabs.profile')}>
                        <this.UserProfileEditor
                            userId={this.props.params.userId}
                            dateTimePattern={this.context.datePattern}
                            onChange={() => this.handleChange()}
                            onUpdate={(profile) => this.handleUpdate(profile)}
                        />
                    </Tab>
                    <Tab eventKey={1} title={i18n.getMessage('UserAdmin.Editor.tabs.roles')}>
                        <this.UserRoleEditor userId={this.props.params.userId} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
