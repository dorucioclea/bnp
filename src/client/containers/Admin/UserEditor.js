import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import translations from '../i18n'

export default class UserEditor extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        context.i18n.register('UserAdmin.Editor', translations);
        this.userIsAdmin = context.userData.roles.includes('admin');

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

        this.UserPasswordForm = context.loadComponent({
            serviceName: 'user',
            moduleName: 'user-password',
            jsFileName: 'password-bundle'
        });

        if(this.userIsAdmin)
        {
            this.UserResetPasswordForm = context.loadComponent({
                serviceName: 'user',
                moduleName: 'user-password-reset',
                jsFileName: 'password-reset-bundle'
            });
        }

        this.UserProfileImageUploader = context.loadComponent({
            serviceName: 'user',
            moduleName: 'user-profile-image-uploader',
            jsFileName: 'profile-image-uploader-bundle'
        });

        this.state = {
            isDirty: false,
            tab: 0
        };
    }

    handleTabChange(tab)
    {
        this.setState({ tab });
    }

    handleBackClick()
    {
        this.confirmUnsavedChanges(() => this.context.router.push('/bnp/users'));
    }

    confirmUnsavedChanges(onConfirmed)
    {
        if(this.state.isDirty)
        {
            const { i18n } = this.context;
            const title = i18n.getMessage('UserAdmin.Editor.unsavedChangesConfirmation.title');
            const message = i18n.getMessage('UserAdmin.Editor.unsavedChangesConfirmation.message');
            const onButtonClick = (button) => button === 'yes' && onConfirmed() || true;
            const buttons = { yes : i18n.getMessage('System.yes'), no : i18n.getMessage('System.no') };

            this.context.showModalDialog(title, message, onButtonClick, buttons);
        }
        else
        {
            onConfirmed();
        }
    }

    handleChange()
    {
        this.setState({ isDirty : true });
    }

    handleUpdate()
    {
        this.setState({ isDirty : false });
    }

    render()
    {
        const i18n = this.context.i18n;

        this.context.setPageTitle(i18n.getMessage('UserAdmin.Editor.titles.page'));

        return(
            <div>
                <button className='btn btn-default' onClick={() => this.handleBackClick()}>
                    <span className="icon glyphicon glyphicon-chevron-left" />
                    {i18n.getMessage('UserAdmin.Editor.back')}
                </button>
                <Tabs id="userEditorTabs" activeKey={this.state.tab} onSelect={tab => this.handleTabChange(tab)} style={{ marginTop: '20px' }}>
                    <Tab eventKey={0} title={i18n.getMessage('UserAdmin.Editor.tabs.profile')}>
                        <this.UserProfileEditor userId={this.props.params.userId} dateTimePattern={this.context.datePattern} onChange={() => this.handleChange()} onUpdate={(profile) => this.handleUpdate(profile)} />
                    </Tab>
                    <Tab eventKey={1} title={i18n.getMessage('UserAdmin.Editor.tabs.roles')}>
                        <this.UserRoleEditor userId={this.props.params.userId} />
                    </Tab>
                    <Tab eventKey={2} title={i18n.getMessage('UserAdmin.Editor.tabs.password')}>
                        <p></p>
                        {
                            this.userIsAdmin &&
                            <div>
                                <p>&nbsp;</p>
                                <this.UserResetPasswordForm userId={this.props.params.userId} />
                                <hr />
                            </div>
                        }
                        <this.UserPasswordForm userId={this.props.params.userId} />
                    </Tab>
                    <Tab eventKey={3} title={i18n.getMessage('UserAdmin.Editor.tabs.image')}>
                        <h4 className="tab-description">
                          {i18n.getMessage('UserAdmin.Editor.titles.image', { userId: this.props.params.userId })}
                        </h4>
                        <br />
                        <this.UserProfileImageUploader userId={this.props.params.userId} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
