import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import Logo from "../../assets/img/S-logo.png";
import styles from "./Header.module.scss";
import highContrastOn from "../../assets/img/high-contrast.svg";
import highContrastOff from "../../assets/img/high-contrast-off.svg";
import login from "../../assets/img/login.svg";
import logout from "../../assets/img/logout.svg";
import user from "../../assets/img/user.svg";
import { setHighContrast, setAuthStatus } from "../../actions/Header";
import menuImg from "../../assets/img/menu.svg";
import menuOpenImg from "../../assets/img/menuOpen.svg";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeaderOpen: false,
      contrast: false,
      isDashBoardActive: false,
      isDonorDatabaseActive: false,
      isDonorManagementActive: false,
      isRenewalTrackingActive: false,
      isFinanceMoaduleActive: false,
      isDonorProfileActive: true
    };
  }


  toggleContrast = () => {
    const { contrast } = this.state;
    const { setHighContrast } = this.props;
    this.setState({
      contrast: !contrast,
    });
    setHighContrast();
  };

  toggleHeader = () => {
    this.setState({
      isHeaderOpen: !this.state.isHeaderOpen,
    });
  };

  ShowErrorHeader = () => {

    this.setState({
      isHeaderOpen: !this.state.isHeaderOpen,
    });
    let myColor = { background: '#88888875', text: "#FFFFFF" };
    notify.show(
      <div className={styles.alertMsg}>
        Please sign in or create an account to continue.
        <div className={styles.alertBtn}>
          <button onClick={notify.hide} type="submit">
            Cancel
          </button>
        </div>
      </div>,
      myColor,
      1000000
    );
  };

  onLogoutClick = () => {
    const { setAuthStatus } = this.props;
    setAuthStatus({ payload: { isAuthenticated: false } });
   // window.location.reload(true);
  };

  onActiveClick = (menuName) => {
    const {history} = this.props;
    var className = 'dropdown__trigger_Active';
    switch (menuName) {

      case 'DASHBOARD':
        this.setState({
          isDashBoardActive: true,
          isDonorDatabaseActive: false,
          isDonorManagementActive: false,
          isRenewalTrackingActive: false,
          isFinanceMoaduleActive: false,
          isDonorProfileActive: false
        });

        break;
      case 'DONORMANAGEMENT':
        this.setState({
          isDashBoardActive: false,
          isDonorDatabaseActive: false,
          isDonorManagementActive: true,
          isRenewalTrackingActive: false,
          isFinanceMoaduleActive: false,
          isDonorProfileActive: false
        });

        break;
      case 'DONORDATABASE':
        this.setState({
          isDashBoardActive: false,
          isDonorDatabaseActive: true,
          isDonorManagementActive: false,
          isRenewalTrackingActive: false,
          isFinanceMoaduleActive: false,
          isDonorProfileActive: false
        });

        break;
      case 'FINANCEMODULE':
        this.setState({
          isDashBoardActive: false,
          isDonorDatabaseActive: false,
          isDonorManagementActive: false,
          isRenewalTrackingActive: false,
          isFinanceMoaduleActive: true,
          isDonorProfileActive: false
        });

        break;
      case 'RT':
        this.setState({
          isDashBoardActive: false,
          isDonorDatabaseActive: false,
          isDonorManagementActive: false,
          isRenewalTrackingActive: true,
          isFinanceMoaduleActive: false,
          isDonorProfileActive: false
        });

        break;
      case 'DP':
        this.setState({
          isDashBoardActive: false,
          isDonorDatabaseActive: false,
          isDonorManagementActive: false,
          isRenewalTrackingActive: false,
          isFinanceMoaduleActive: false,
          isDonorProfileActive: true
        });
        window.location.href = "/donorProfilePage";
        break;
    }
  }

  render() {
    const {
      isAuthenticated,
      setHighContrast,
      highContrast,
      location,
      customerInfo,
      userName,
    } = this.props;

    const { isHeaderOpen, contrast, isDashBoardActive, isDonorDatabaseActive, isDonorManagementActive,
      isFinanceMoaduleActive, isRenewalTrackingActive, isDonorProfileActive } = this.state;
    const containerStyle = isHeaderOpen
      ? styles.containerExpand
      : styles.container;
    const mainContainerStyle = highContrast ? styles.darkContainer : styles.container;
    const menuDarkContainerStyle = highContrast ? styles.menusDarkContainer : styles.menusContainer;
    return (
      <div className={mainContainerStyle}>
        <div className={containerStyle}>
          <div className={styles.headerStyle}>
            <div className={styles.headerMainNav}>
              <div
                className={styles.menuComponent}
                aria-label="menu"
                onClick={() => this.toggleHeader()}
                onKeyPress={() => this.toggleHeader()}
                role="button"
                tabIndex={0}
              >
                <img
                  alt="menu"
                  className={styles.menuButtonImg}
                  src={isHeaderOpen ? menuOpenImg : menuImg}
                />
              </div>
              <div className={styles.logoContainer} aria-label="menu">
                <a href="/" target="_self" rel="noopener noreferrer">
                  <img src={Logo} alt="logo" />
                </a>
              </div>
              <div className={menuDarkContainerStyle}>
                <div className={styles.menuItemBlock}>
                  <div className={isDashBoardActive === true ? styles.headerMenuActive : styles.headerMenu} onClick={() => this.onActiveClick('DASHBOARD')} >
                    <DropdownMenu
                      title={'DASHBOARD'}
                      isImageRequired={false}
                      className={isDashBoardActive === false ? '' : 'dropdown__trigger_Active'}
                      contentClassName={'dropdown__content'}
                      content={
                        <div data-test="Dashboard">
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/accountInfoPage"
                            >
                              Opex Donor
                            </NavLink>
                          </div>
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/accountInfoPage"
                            >
                              Family Unit
                            </NavLink>
                          </div>
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/"
                              onClick={this.onLogoutClick}
                            >
                              Cost Center
                            </NavLink>
                          </div>
                        </div>
                      }
                    />
                  </div>
                  <div className={isDonorDatabaseActive === true ? styles.headerMenuActive : styles.headerMenu} onClick={() => this.onActiveClick('DONORDATABASE')} >
                    <DropdownMenu
                      title={'DONOR DATABASE'}
                      isImageRequired={false}
                      className={isDonorDatabaseActive === false ? '' : 'dropdown__trigger_Active'}
                      contentClassName={'dropdown__content'}
                      content={
                        <div data-test="Dashboard">
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/accountInfoPage"
                            >
                              Dashboard
                            </NavLink>
                          </div>
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/accountInfoPage"
                            >
                              Prospects
                            </NavLink>
                          </div>
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/"
                              onClick={this.onLogoutClick}
                            >
                              Donors
                            </NavLink>
                          </div>
                        </div>
                      }
                    />
                  </div>
                  <div className={isDonorManagementActive === true ? styles.headerMenuActive : styles.headerMenu} onClick={() => this.onActiveClick('DONORMANAGEMENT')} >
                    <DropdownMenu
                      title={'DONATION MANAGEMENT'}
                      isImageRequired={false}
                      contentClassName={'dropdown__content'}
                      className={isDonorManagementActive === false ? '' : 'dropdown__trigger_Active'}
                      content={
                        <div data-test="Dashboard">
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to=""
                            >
                              Funds Utilisation
                            </NavLink>
                          </div>
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to=""
                            >
                              Extension Update
                            </NavLink>
                          </div>
                        </div>
                      }
                    />
                  </div>
                  <div className={isRenewalTrackingActive === true ? styles.headerMenuActive : styles.headerMenu} onClick={() => this.onActiveClick('RT')} >
                    <NavLink className={isRenewalTrackingActive === true ? styles.fontColor : ''} to="/">RENEWAL TRACKING</NavLink>
                  </div>
                  <div className={isFinanceMoaduleActive === true ? styles.headerMenuActive : styles.headerMenu} onClick={() => this.onActiveClick('FINANCEMODULE')} >
                    <DropdownMenu
                      title={'FINANCE MODULE'}
                      isImageRequired={false}
                      contentClassName={'dropdown__content'}
                      className={isFinanceMoaduleActive === false ? '' : 'dropdown__trigger_Active'}
                      content={
                        <div data-test="FinanceModule">
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/"
                            >
                              Budget Upload
                            </NavLink>
                          </div>
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/"
                            >
                              Donation Report
                            </NavLink>
                          </div>
                          <div className={styles.iconsAlign}>
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/"
                            >
                              Funds Utilisation
                            </NavLink>
                          </div>
                        </div>
                      }
                    />
                  </div>
                  <div className={isDonorProfileActive === true ? styles.headerMenuActive : styles.headerMenu} onClick={() => this.onActiveClick('DP')} >
                    <NavLink className={isDonorProfileActive === true ? styles.fontColor : ''} to="/">DONOR PROFILE</NavLink>
                  </div>
                  <DropdownMenu
                    className={cn(
                      styles.item,
                      styles.itemLink,
                      styles.itemLinkBold,
                      styles.longName
                    )}
                    isImageRequired={true}
                    contentClassName={'dropdown__content1'}
                    content={
                      <div data-test="Logout">
                        <div className={styles.iconsAlign}>
                          <img alt="img" className={styles.icons} src={user} />
                          <NavLink
                            className={styles.userName}
                            isActive={styles.isActive}
                            to="/"
                          >
                            My Profile
                          </NavLink>
                        </div>
                        <div className={styles.iconsAlign}>
                          <img alt="img" className={styles.icons} src={user} />
                          <NavLink
                            className={styles.userName}
                            isActive={styles.isActive}
                            to="/"
                          >
                            Notifications
                          </NavLink>
                        </div>
                        <div className={styles.iconsAlign}>
                          <img alt="img" className={styles.icons} src={logout} />
                          <NavLink
                            className={styles.userName}
                            isActive={styles.isActive}
                            to="/signIn"
                            onClick={this.onLogoutClick}
                          >
                            Sign out
                          </NavLink>
                        </div>
                      </div>
                    }
                  />
                </div>
                <div className={styles.contrastBlock}>
                  <div className={styles.divider} />
                  <div
                    className={styles.contrastImage}
                    data-tip="Enable or Disable High Contrast"
                    role="button"
                    tabIndex={0}
                    onClick={this.toggleContrast}
                  >
                    <img
                      alt="high contrast"
                      className={styles.notificationsImg}
                      src={contrast ? highContrastOff : highContrastOn}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div
              className={cn(
                isHeaderOpen && styles.menuResponsiveOpen,
                styles.menuResponsiveClose
              )}
            >
              {!isAuthenticated ? (
                <div className={styles.menuItemResponsive}>
                  <NavLink to="/" onClick={this.ShowErrorHeader}>Shop</NavLink>
                </div>
              ) : (
                <div className={styles.menuItemResponsive}>
                  <NavLink to="/productPage">Shop</NavLink>
                </div>
              )}
              <div className={styles.menuItemResponsive}>
                <NavLink to="/contactUsPage">Contact Us</NavLink>
              </div>
              <div className={styles.menuItemResponsive}>
                <a
                  href=""
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy Policy & Notifications
                </a>
              </div>
              <div className={styles.menuItemResponsive}>
                <a
                  href=""
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Terms of Use
                </a>
              </div>
              <div className={styles.menuItemResponsive}>
                <NavLink to="/">Sign In</NavLink>
              </div>
              <div className={styles.menuItemResponsive}>
                <NavLink to="">Sign Out</NavLink>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  setHighContrast: PropTypes.func.isRequired,
  setAuthStatus: PropTypes.func.isRequired,
};

Header.defaultProps = {
  
};

const mapStateToProps = (state) => {
  return {
    highContrast: state.header.highContrast,
    isAuthenticated: state.header.isAuthenticated,
    userName: state.header.userName,
  };
};

const mapDispatchToProps = {
  setAuthStatus,
  setHighContrast,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

