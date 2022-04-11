import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { notify } from 'react-notify-toast';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInForm from '../../components/SignInForm/SignInForm';
import styles from './SignInPage.module.scss';
import { authProviderRequest } from '../../actions/Auth';
import { setAuthStatus, setUserName } from '../../actions/Header';
import {connect} from 'react-redux';
import qs from 'query-string';
import Logo from "../../assets/img/desklogo.png";


class SignInPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
   
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    
  }

  handleSubmit = values => {
    const { authProviderRequest } = this.props;
    this.handleSubmitSuccess()
    this.setState({
      isLoading: true,
    });
    
  };

  handleSubmitSuccess = () => {

    const { history, setAuthStatus, setUserName, customerInfo } = this.props;
    const { FirstName, LastName, } = customerInfo;

    let userName = 'Unknown User';

      setAuthStatus({ payload: { isAuthenticated: true } });
      // if (FirstName && LastName) {
      //   userName = `${customerInfo.FirstName} ${
      //     FirstName.length < 3 ? customerInfo.LastName : ''
      //   }`;
      // }
      // if (userName.length > 7) {
      //   userName = `${userName.substring(0, 6)}...`;
      // }

      userName = `${FirstName} ${LastName}`
      setUserName({
        payload: {
          userName,
        },
      });
      history.push(`/donorProfilePage`);
      window.location.reload(false);
      
    
    
  };

  redirectLocation = base => {
    const { location } = this.props;
    if (location) {
      if (location.pathname !== `/signIn` && location.pathname !== `/signUp`) {
        return `/${base}?redirect=${location.pathname}${
          location.search ? encodeURIComponent(location.search) : ''
        }`;
      }
      return `/${base}${location.search ? location.search : '?redirect=/'}`;
    }
    return `/${base}?redirect=/`;
  };


  render() {
    const { isLoading } = this.state;
    return (
      <div className={styles.primaryContainer}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
        </Helmet>
        <div className={styles.heroImage}>
          <div className={styles.heroImageOverlay}>
            <div className={styles.logoContainer}>
            <img src={Logo} alt="logo" />
            </div>
         
            <SignInForm loading={isLoading} onSubmit={this.handleSubmit} />
            <p className={styles.overlayTextContent}>
              Need Help Logging in?{' '}
              <Link
                aria-label="ForgetPassword"
                className={styles.link}
                to={this.redirectLocation('ForgetPassword')}
              >
                Click Here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SignInPage.propTypes = {
  authProviderRequest: PropTypes.func.isRequired,
  customerInfo: PropTypes.shape({
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    MiddleInitial: PropTypes.string,
    isPasswordExpired: PropTypes.bool,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
  setAuthStatus: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
};

SignInPage.defaultProps = {};

const mapStateToProps = state => ({
  customerInfo: state.auth.customerInfo,
});

const mapDispatchToProps = {
  authProviderRequest,
  setAuthStatus,
  setUserName,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
