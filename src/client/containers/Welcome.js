import React from 'react';
import { Components, System, Api } from '@opuscapita/service-base-ui';
import translations from './i18n';
import ajax from 'superagent-bluebird-promise';

class Welcome extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        context.i18n.register('Welcome', translations);

        this.state = {
            showWelcomePage : true
        }

        this.authApi = new Api.Auth();
    }

    handleShowWelcomePage()
    {
        const data = { showWelcomePage : !this.state.showWelcomePage };
        const { showNotification, i18n } = this.context;

        return ajax.put('/user/api/users/current/profile')
            .set('Content-Type', 'application/json').send(data)
            .then(() => this.setState(data))
            .then(() => showNotification(i18n.getMessage('Welcome.notification.saved'), 'success'));
    }

    componentDidMount()
    {
        ajax.get('/user/api/users/current/profile').then(res =>
        {
            this.setState({ showWelcomePage: res.body.showWelcomePage })
        });
    }

    handleStart(e)
    {
        e.preventDefault();
        this.authApi.refreshIdToken().then(() => this.context.router.push('/einvoice-send')).catch(e => this.context.showNotification(e.message, 'error', 10))
    }

    render()
    {
        const { i18n } = this.context;

        this.context.setPageTitle(i18n.getMessage('Welcome.page.title'));

        const outerStyles = {
            minHeight : '100vh',
            background : 'url("/bnp/static/img/service-config-welcome.jpg") center top / cover fixed'
        };

        const closeStyle = {
            fontSize : '32px',
            color : 'grey'
        }

        const innerStyle = {
            height : '100vh',
            margin : '40px 80px',
            padding : '20px',
            backgroundColor : 'white',
            opacity : 0.75
        }

        const textStyle = {
            fontSize : '20px'
        }

        const cog1Style = {
            position: 'fixed',
            top: '10%',
            left: '50%',
            width: '50%',
            opacity: 0.4,
            zIndex: '-99999'
        }

        const cog2Style = {
            position: 'fixed',
            top: '30%',
            left: '40%',
            width: '60%',
            zIndex: '-99999'
        }

        return(
            <div style={outerStyles}>
                <div className="row">
                    <div style={innerStyle}>
                        <div className="col-md-6">
                            <h1>{i18n.getMessage('Welcome.title')}</h1>
                            <p style={textStyle}>
                                {System.UI.nl2br(i18n.getMessage('Welcome.text'))}
                            </p>
                            <br/>
                            <div className="form-submit text-right">
                                <label className="oc-check">
                                    <input type="checkbox" value="1" checked={this.state.showWelcomePage === false} onChange={()=> this.handleShowWelcomePage() } />
                                    {i18n.getMessage('Welcome.label.dontShowAgain')}
                                </label>
                                &nbsp;&nbsp;
                                <button className="btn btn-lg btn-primary" onClick={e => this.handleStart(e)}>{i18n.getMessage('Welcome.button.start')}</button>
                            </div>
                        </div>
                        <div className="col-md-4 col-md-offset-1">
                            <img src={`/bnp/static/img/cog.svg`} style={cog1Style} />
                            <img src={`/bnp/static/img/cog.svg`} style={cog2Style} />
                        </div>
                        <div className="col-md-1 text-right">
                            <a href="#" style={closeStyle} onClick={e => this.handleStart(e)}><i className="glyphicon glyphicon-remove"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;
