import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import connect from 'react-redux/lib/components/connect';

const BUYING_ROLE = 'buying';
const SELLING_ROLE = 'selling';

class SidebarMenu extends React.Component {
  static propTypes = {
    currentUserInfo: React.PropTypes.object,
    activeMainMenuName: React.PropTypes.string,
    activeSubMenuName: React.PropTypes.string
  };

  static defaultProps = {
    activeMainMenuName: 'Home',
    activeSubMenuName: null
  };

  constructor(props) {
    super(props);

    this.state = {
      oldOpenMenuName: null,
      currentOpenMenuName: null,
      activeMainMenuName: this.props.activeMainMenuName,
      activeSubMenuName: this.props.activeSubMenuName
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.hideMenu, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideMenu, false);
  }

  hideMenu = () => {
    if (this.state.currentOpenMenuName) {
      this.setState({
        oldOpenMenuName: this.state.currentOpenMenuName,
        currentOpenMenuName: null
      });
    } else if (this.state.oldOpenMenuName) {
      this.setState({ oldOpenMenuName: null });
    }
  };

  mainMenuWithSubmenuClick(menuName, e) {
    e.preventDefault();

    if (this.state.oldOpenMenuName !== menuName) {
      this.setState({ currentOpenMenuName: menuName });
    }
  }

  handleMenuItemClick(link, activeMainMenuName, activeSubMenuName, e) {
    // Third argument is optional, null if a main-menu item does not have sub-menu items.
    if (typeof activeSubMenuName !== 'string') {
      activeSubMenuName = null;  // eslint-disable-line no-param-reassign
      e = arguments[2];  // eslint-disable-line no-param-reassign
    }

    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/${link}`);

    let activeMenuName = {};

    if (this.state.activeMainMenuName !== activeMainMenuName) {
      activeMenuName.activeMainMenuName = activeMainMenuName;
    }

    if (this.state.activeSubMenuName !== activeSubMenuName) {
      activeMenuName.activeSubMenuName = activeSubMenuName;
    }

    if (Object.keys(activeMenuName).length) {
      this.setState(activeMenuName);
    }
  }

  render() {
    let { currentUserInfo: userInfo } = this.props;
    let isBuyer = userInfo.companyRole === BUYING_ROLE;
    let isSupplier = userInfo.companyRole === SELLING_ROLE;

    return (
      <section className="sidebar" style={{ minHeight: '100vh', position: 'fixed', zIndex: 3 }}>
        <nav className="navbar navbar-default">
          <div className="nav-background"></div>
          <div className="navbar-header hidden-md">
            <a className="navbar-brand visible-lg" href="http://www.opuscapita.com/">
              <img src={`${window.simContextPath}/img/oc-logo-white.svg`} style={{ height: '1.4em' }}/>
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li className={`${this.state.activeMainMenuName === 'Home' && ' active' || ''}`}>
              <a
                href="#"
                onClick={this.handleMenuItemClick.bind(this, 'dashboard', 'Home')}
              >
                <span className="oci oci-store"></span>
                Home
              </a>
            </li>

            {
              <li className={`dropdown${
                  this.state.currentOpenMenuName === 'Orders' && ' open' || ''
                }${
                  this.state.activeMainMenuName === 'Orders' && ' active' || ''
                }`}
              >
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={this.mainMenuWithSubmenuClick.bind(this, 'Orders')}
                >
                  <span className="oci oci-order"></span>
                  Orders <span className="badge">3</span>
                </a>
                <ul className="dropdown-menu">
                  { isBuyer &&
                  <li className={`${
                  this.state.activeMainMenuName === 'Orders' &&
                  this.state.activeSubMenuName === 'OrderInspect' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'orderInspect', 'Orders', 'OrderInspect')}
                    >
                      Order Inspect
                    </a>
                  </li>}
                  { isSupplier &&
                    <li className={`${
                      this.state.activeMainMenuName === 'Orders' &&
                      this.state.activeSubMenuName === 'OrderCon' &&
                      ' active' ||
                      ''
                    }`}
                    >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'orderConfirmation', 'Orders', 'OrderCon')}
                    >
                      Order Confirmation <span className="badge">3</span>
                    </a>
                  </li>}
                  <li className={`${
                      this.state.activeMainMenuName === 'Orders' &&
                      this.state.activeSubMenuName === 'OrderHistory' &&
                      ' active' ||
                      ''
                    }`}
                  >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'orderHistory', 'Orders', 'OrderHistory')}
                    >
                      Order History
                    </a>
                  </li>
                  { isSupplier &&
                    <li className={`${
                      this.state.activeMainMenuName === 'Orders' &&
                      this.state.activeSubMenuName === 'PO Download' &&
                      ' active' ||
                      ''
                    }`}
                    >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'poDownload', 'Orders', 'PO Download')}
                    >
                      PO Download
                    </a>
                  </li>}
                </ul>
              </li>
            }

            {
              isBuyer &&
              <li className={`${this.state.activeMainMenuName === 'ShippingNotice' && ' active' || ''}`}>
                <a href="#" onClick={this.handleMenuItemClick.bind(this, 'shippingNotice', 'ShippingNotice')}>
                  <span className="oci oci-texts"></span>
                  Shipping Notice
                </a>
              </li>
            }

            <li className={`dropdown${
                this.state.currentOpenMenuName === 'Invoice' && ' open' || ''
              }${
                this.state.activeMainMenuName === 'Invoice' && ' active' || ''
              }`}
            >
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'Invoice')}
              >
                <span className="oci oci-invoice"></span>
                Invoice <span className="badge">7</span>
              </a>
              <ul className="dropdown-menu">
                {
                  isBuyer &&
                  <li className={`${
                      this.state.activeMainMenuName === 'Invoice' &&
                      this.state.activeSubMenuName === 'Approval' &&
                      ' active' ||
                      ''
                    }`}
                  >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'invoiceApproval', 'Invoice', 'Approval')}
                    >
                      Approval <span className="badge">7</span>
                    </a>
                  </li>
                }
                <li className={`${
                    this.state.activeMainMenuName === 'Invoice' &&
                    this.state.activeSubMenuName === 'Inspect' &&
                    ' active' ||
                    ''
                  }`}
                >
                  <a
                    href="#"
                    onClick={this.handleMenuItemClick.bind(this, 'invoiceInspect', 'Invoice', 'Inspect')}
                  >
                    Inspect
                  </a>
                </li>
                {
                  isBuyer &&
                  <li className={`${
                      this.state.activeMainMenuName === 'Invoice' &&
                      this.state.activeSubMenuName === 'DisputeManagement' &&
                      ' active' ||
                      ''
                    }`}
                  >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'disputeManagement', 'Invoice', 'DisputeManagement')}
                    >
                      Dispute Management
                    </a>
                  </li>
                }
                {
                  isSupplier &&
                  <li className={`${
                      this.state.activeMainMenuName === 'Invoice' &&
                      this.state.activeSubMenuName === 'Create New' &&
                      ' active' ||
                      ''
                    }`}
                  >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'invoice/create', 'Invoice', 'Create New')}
                    >
                      Create New
                    </a>
                  </li>
                }
              </ul>
            </li>

            <li className={`${this.state.activeMainMenuName === 'OtherDocs' && ' active' || ''}`}>
              <a href="#" onClick={this.handleMenuItemClick.bind(this, 'otherDocuments', 'OtherDocs')}>
                <span className="oci oci-docu"></span>
                Other Docs
              </a>
            </li>

            {
              isSupplier &&
              <li className={`${this.state.activeMainMenuName === 'Products' && ' active' || ''}`}>
                <a href="#" onClick={this.handleMenuItemClick.bind(this, 'products', 'Products')}>
                  <span className="oci oci-products"></span>
                  Products
                </a>
              </li>
            }

            <li className={`dropdown${
                this.state.currentOpenMenuName === 'RfQ' && ' open' || ''
              }${
                this.state.activeMainMenuName === 'RfQ' && ' active' || ''
              }`}
            >
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'RfQ')}
              >
                <span className="oci oci-order-v2"></span>
                RfQ
              </a>
              <ul className="dropdown-menu">
                {
                  isBuyer &&
                  <li className={`${
                      this.state.activeMainMenuName === 'RfQ' &&
                      this.state.activeSubMenuName === 'CreateRfQ' &&
                      ' active' ||
                      ''
                    }`}
                  >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'createRfQ', 'RfQ', 'CreateRfQ')}
                    >
                      Create RfQ
                    </a>
                  </li>
                }
                {
                  isBuyer &&
                  <li className={`${
                      this.state.activeMainMenuName === 'RfQ' &&
                      this.state.activeSubMenuName === 'InspectRfQ' &&
                      ' active' ||
                      ''
                    }`}
                  >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'inspectRfQ', 'RfQ', 'InspectRfQ')}
                    >
                      Inspect RfQ
                    </a>
                  </li>
                }
                {
                  isSupplier &&
                  <li className={`${
                      this.state.activeMainMenuName === 'RfQ' &&
                      this.state.activeSubMenuName === 'ViewRfQs' &&
                      ' active' ||
                      ''
                    }`}
                  >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'viewRfQs', 'RfQ', 'ViewRfQs')}
                    >
                      View RfQs
                    </a>
                  </li>
                }
              </ul>
            </li>

            {
              isBuyer &&
              <li className={`dropdown${
                  this.state.currentOpenMenuName === 'Suppliers' && ' open' || ''
                }${
                  this.state.activeMainMenuName === 'Suppliers' && ' active' || ''
                }`}
              >
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={this.mainMenuWithSubmenuClick.bind(this, 'Suppliers')}
                >
                  <span className="oci oci-supdirect"></span>
                  Suppliers
                </a>
                <ul className="dropdown-menu">
                  <li className={`${
                      this.state.activeMainMenuName === 'Suppliers' &&
                      this.state.activeSubMenuName === 'Dir' &&
                      ' active' ||
                      ''
                    }`}
                  >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'supplierDirectory', 'Suppliers', 'Dir')}
                    >
                      Supplier Directory
                    </a>
                  </li>
                  <li className={`${
                      this.state.activeMainMenuName === 'Suppliers' &&
                      this.state.activeSubMenuName === 'Rating' &&
                      ' active' ||
                      ''
                    }`}
                  >
                    <a
                      href="#"
                      onClick={this.handleMenuItemClick.bind(this, 'supplierRating', 'Suppliers', 'Rating')}
                    >
                      Supplier Rating
                    </a>
                  </li>
                  <li className={`${
                      this.state.activeMainMenuName === 'Suppliers' &&
                      this.state.activeSubMenuName === 'Dashboard' &&
                      ' active' ||
                      ''
                    }`}
                  >
                    <a
                      href={`/onboarding/dashboard`}
                    >
                      Onboarding Dashboard
                    </a>
                  </li>
                  <li>
                    <a href={`/onboarding/`}>
                      Onboarding Campaigns
                    </a>
                  </li>
                  <li>
                    <a href={`/onboarding/create`}>
                      Create Onboarding Campaign
                    </a>
                  </li>
                  <li>
                    <a href={`/onboarding/public/ncc_onboard`}>
                      View Onboarding Page
                    </a>
                  </li>
                </ul>
              </li>
            }

            <li className={`dropdown${
                this.state.currentOpenMenuName === 'Company' && ' open' || ''
              }${
                this.state.activeMainMenuName === 'Company' && ' active' || ''
              }`}
            >
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'Company')}
              >
                <span className="oci oci-user"></span>
                Company
              </a>
              <ul className="dropdown-menu">
                <li className={`${
                    this.state.activeMainMenuName === 'Company' &&
                    this.state.activeSubMenuName === 'Approval' &&
                    ' active' ||
                    ''
                  }`}
                >
                  <a
                    href="#"
                    onClick={this.handleMenuItemClick.bind(this, 'supplierInformation', 'Company', 'Profile')}
                  >
                    Profile
                  </a>
                </li>
                <li className={`${
                    this.state.activeMainMenuName === 'Company' &&
                    this.state.activeSubMenuName === 'ServiceConfig' &&
                    ' active' ||
                    ''
                  }`}
                >
                  <a
                    href="#"
                    onClick={this.handleMenuItemClick.bind(this, 'serviceConfigFlow', 'Company', 'ServiceConfig')}
                  >
                    Service Configuration
                  </a>
                </li>
                <li className={`${
                    this.state.activeMainMenuName === 'Company' &&
                    this.state.activeSubMenuName === 'CompanyInfo' &&
                    ' active' ||
                    ''
                  }`}
                >
                  <a
                    href="#"
                    onClick={this.handleMenuItemClick.bind(this, 'companyInformation', 'Company', 'CompanyInfo')}
                  >
                    Company Information
                  </a>
                </li>
              </ul>
            </li>

            <li className={`${this.state.activeMainMenuName === 'Settings' && ' active' || ''}`}>
              <a href="#" onClick={this.handleMenuItemClick.bind(this, 'settings', 'Settings')}>
                <span className="oci oci-admin"></span>
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </section>
    )
  }
}

function injectState(store) {
  return {
    currentUserInfo: store.currentUserInfo
  };
}

export default connect(injectState)(SidebarMenu);
