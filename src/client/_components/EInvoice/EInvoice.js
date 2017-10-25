/* eslint-disable */
import React from 'react';
import locales from './i18n/locales.js'
import {Tabs, Tab, TabContent, Col, Row, Image, ButtonToolbar, Button} from 'react-bootstrap'

export default class EInvoice extends React.Component {

  static contextTypes = {
    i18n: React.PropTypes.object
  };

  i18n = this.context.i18n.register('CreateAccount', locales);

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
    this.props.activeKey = index;
  }

	render() {
		return (
			<Tabs onSelect={this.handleSelect} activeKey={1}>
				<Tab eventKey={1} title="Create account">
					<TabContent>
						<Row>
							<Col md={4} align="middle">
								<Image responsive src="/img/mockup/einvoicewelcomeleftpanel.png"/>
								<ButtonToolbar>
						      <Button bsStyle="primary">Clear</Button>
						      <Button bsStyle="primary">Save</Button>
									<Button bsStyle="primary">Cancel</Button>
						    </ButtonToolbar>
							</Col>
							<Col md={8}>
								<h6>{this.i18n.getMessage('WelcomeTab.welcomeHeader')}</h6>
								{this.i18n.getMessage('WelcomeTab.welcomeContent')}
								<h6>{this.i18n.getMessage('WelcomeTab.ediAddressHeader')}</h6>
								{this.i18n.getMessage('WelcomeTab.ediAddressContent')}
								<h6>{this.i18n.getMessage('WelcomeTab.nameHeader')}</h6>
								{this.i18n.getMessage('WelcomeTab.nameContent')}
								<h6>{this.i18n.getMessage('WelcomeTab.formatHeader')}</h6>
								{this.i18n.getMessage('WelcomeTab.formatContent')}
								<h6>{this.i18n.getMessage('WelcomeTab.communicationHeader')}</h6>
								{this.i18n.getMessage('WelcomeTab.communicationContent')}
								<h6>{this.i18n.getMessage('WelcomeTab.contactsHeader')}</h6>
								{this.i18n.getMessage('WelcomeTab.contactsContent')}
							</Col>
						</Row>
					</TabContent>
				</Tab>
				<Tab eventKey={2} title="FAQ">
				<TabContent>
					<Row>
						<Col md={12}>
							<h6>{this.i18n.getMessage('FaqTab.eInvoiceHeader')}</h6>
							<p>{this.i18n.getMessage('FaqTab.eInvoiceContent')}</p>
							<p>{this.i18n.getMessage('FaqTab.eInvoiceFooter')}</p>
						</Col>
					</Row>
					<Row>
						<Col md={4}>
							<Image responsive src="/img/mockup/einvoicefaqleft.png"/>
						</Col>
						<Col md={4}>
							<Image responsive src="/img/mockup/einvoicefaqmiddle.png"/>
						</Col>
						<Col md={4}>
							<Image responsive src="/img/mockup/einvoicefaqright.png"/>
						</Col>
					</Row>
				</TabContent></Tab>
				<Tab eventKey={3} title="Validation">
				<TabContent>
				<Row>
					<Col md={12}>
						<h6>{this.i18n.getMessage('ValidationTab.validationHeader')}</h6>
						<p>{this.i18n.getMessage('ValidationTab.validationContent1')}</p>
						<p>{this.i18n.getMessage('ValidationTab.validationContent2')}</p>
						<p>{this.i18n.getMessage('ValidationTab.validationContent3')}</p>
					</Col>
				</Row>
				<Row>
					<Col md={8}>
						<Image responsive src="/img/mockup/einvoicevalidationleft.png"/>
					</Col>
					<Col md={4}>
						<Button bsStyle="primary">Submit</Button>
					</Col>
				</Row>
				</TabContent></Tab>
			</Tabs>
		)
	}
}
