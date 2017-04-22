import React from 'react';
import { Button, Nav, NavItem, Tab, Row } from 'react-bootstrap';
import { SidebarMenu } from 'ocbesbn-react-components';
import ServiceConfigStepOne from '../ServiceConfigStepOne';
import ServiceConfigStepTwo from '../ServiceConfigStepTwo';
import ServiceConfigStepThree from '../ServiceConfigStepThree';
import ServiceConfigStepFour from '../ServiceConfigStepFour';
import ServiceConfigStepFive from '../ServiceConfigStepFive';

// A workaround to prevent a browser warning about unknown properties 'active', 'activeKey' and 'activeHref'
// in DIV element.
const MyDiv = () => {
  return <div className="connecting-line" />;
};

export default class ServiceConfigFlow extends React.Component {
  static propTypes = {
    latestStep: React.PropTypes.number
  };

  static defaultProps = {
    latestStep: 1
  };

  constructor(props) {
    super(props);

    this.state = {
      currentTab: this.props.latestStep
    };
  }

  render() {
    return (
      <div style={{ minHeight: '100vh' }}>
        <SidebarMenu activeMainMenuName="Company" activeSubMenuName="ServiceConfig" />
        <section
          className="content"
          style={{
            overflow: 'visible'
          }}
        >
          <div className="content-wrap">
            <div className="container">
              <section className="header">
                <h1>
                  Service Configuration Flow
                  <div className="control-bar text-right pull-right">
                    <Button>
                      <i className="fa fa-angle-left" />
                      &nbsp;&nbsp;Back to Registration
                    </Button>
                  </div>
                </h1>
              </section>

              <div className="container">
                <div className="row">
                  <section>
                    <div className="wizard">
                      <div className="wizard-inner">
                        <Tab.Container
                          activeKey={this.state.currentTab}
                          onSelect={currentTab => this.setState({ currentTab })}
                          id="stepsContainer"
                        >
                          <Row className="clearfix">
                            <Nav bsStyle="tabs">
                              <MyDiv />
                              <NavItem eventKey={1}>
                                <span className="round-tab"><i className="glyphicon glyphicon-pencil" /></span>
                              </NavItem>
                              <NavItem eventKey={2} disabled={this.state.currentTab < 2}>
                                <span className="round-tab"><i className="glyphicon glyphicon-cog" /></span>
                              </NavItem>
                              <NavItem eventKey={3} disabled={this.state.currentTab < 3}>
                                <span className="round-tab"><i className="glyphicon glyphicon-search" /></span>
                              </NavItem>
                              <NavItem eventKey={4} disabled={this.state.currentTab < 4}>
                                <span className="round-tab"><i className="glyphicon glyphicon-credit-card" /></span>
                              </NavItem>
                              <NavItem eventKey={5} disabled={this.state.currentTab < 5}>
                                <span className="round-tab"><i className="glyphicon glyphicon-ok" /></span>
                              </NavItem>
                            </Nav>
                            <Tab.Content>
                              <Tab.Pane eventKey={1}>
                                <ServiceConfigStepOne
                                  onNextTab={() => this.setState({ currentTab: 2 })}
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey={2}>
                                <ServiceConfigStepTwo
                                  onPreviousTab={() => this.setState({ currentTab: 1 })}
                                  onNextTab={() => this.setState({ currentTab: 3 })}
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey={3}>
                                <ServiceConfigStepThree
                                  onPreviousTab={() => this.setState({ currentTab: 2 })}
                                  onNextTab={() => this.setState({ currentTab: 4 })}
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey={4}>
                                <ServiceConfigStepFour
                                  onPreviousTab={() => this.setState({ currentTab: 3 })}
                                  onNextTab={() => this.setState({ currentTab: 5 })}
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey={5}>
                                <ServiceConfigStepFive
                                  onPreviousTab={() => this.setState({ currentTab: 4 })}
                                />
                              </Tab.Pane>
                            </Tab.Content>
                          </Row>
                        </Tab.Container>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

