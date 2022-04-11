import cn from 'classnames';
import {change} from 'redux-form';
import PropTypes from 'prop-types';
import moment from 'moment';
import qs from 'query-string';
import React, {Component} from 'react';
import {notify} from 'react-notify-toast';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {
  getCustomerServiceInfo,
  registerCustomerRequest,
  accessCodeIncrement,
} from '../../actions/Auth';
import {setAuthStatus, setUserName} from '../../actions/Header';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Spinner from '../../components/Spinner/Spinner';
import styles from './SignUpPage.module.scss';

class SignUpPage extends Component {
  constructor (props) {
    super (props);
    this.state = {
      genderTypes: [],
      isInitialLoading: true,
      isLoading: false,
      phoneTypes: [],
      states: [],
    };
  }

  componentDidMount () {
    const {getCustomerServiceInfo} = this.props;
    window.scrollTo (0, 0);
    const res = new Promise ((resolve, reject) =>
      getCustomerServiceInfo ({reject, resolve})
    );
    res.then (() => {
      this.handleCSISuccess ();
    });
    res.catch (error => {
      if (error.response.status === 400) {
        notify.show (
          `An error occurred. Please try again. ${error.response.data.errorMessage}`,
          'error',
          5000
        );
      } else {
        notify.show (
          `An error occurred. Please try again. Technical Information: ${error}`,
          'error',
          5000
        );
      }
    });
  }

  handleCSISuccess = value => {
    const {signUpInitialData, change} = this.props;
    this.setState ({
      genderTypes: signUpInitialData.genderTypes,
      isInitialLoading: false,
      phoneTypes: signUpInitialData.phoneTypes,
      states: signUpInitialData.stateTypes,
    });

  }

  handleSubmit =  values => {
    const {registerCustomerRequest,accessCodeIncrement,accessCodeCounter,history} = this.props;
    const dateFormate = moment (values.dateOfBirth).format ('YYYY-MM-DD');
    this.setState ({
      isLoading: true,
    });
    const res = new Promise ((resolve, reject) =>
      registerCustomerRequest (
        {
          address1: values.addressLine1,
          address2: values.addressLine2,
          birthDate: dateFormate,
          cityName: values.city,
          code: values.zipcode,
          emailAddress: values.email,
          emailOptIn: true,
          firstName: values.firstName,
          genderID: values.gender,
          groupAccountID: 1,
          lastName: values.lastName,
          loginPwd: values.password,
          middleInitial: values.middleName,
          phone: values.phoneNumber,
          phone2: null,
          phone2Id: null,
          phoneId: values.phoneType,
          ssn: values.ssn,
          stateId: values.state,
          authorizeCode: values.accesscode
        },
        {reject, resolve}
      )
    );
    res.then (() => this.handleSubmitSuccess ());
    res.catch (error => {
      if(accessCodeCounter>=3)
      {
        history.push("/helpDeskPage")
      }
      if(error.response.data.Message==="AUTHORIZE CODE IS NOT EXIST"){
        accessCodeIncrement({accessCodeCounter:accessCodeCounter+1})
        notify.show (
          `An error occurred. ${error.response.data.Message}`,
          'error',
          5000
        );
         
          
      }
      if (error.response.status === 400) {
        notify.show (
          `An error occurred. ${error.response.data.Message}`,
          'error',
          5000
        );
      } else {
        notify.show (
          `An error occurred. Please try again. Technical Information: ${error.response.data.Message}`,
          'error',
          5000
        );
      }
      this.setState ({
        isLoading: false,
      });
    });
  }

  handleSubmitSuccess = () => {
    const {history, setAuthStatus, setUserName, customerInfo} = this.props;
    setAuthStatus ({payload: {isAuthenticated: true}});
    if (customerInfo.firstName || customerInfo.lastName) {
      setUserName ({
        payload: {
          userName: `${customerInfo.firstName ? customerInfo.firstName : ''} ${customerInfo.lastName ? customerInfo.lastName : ''}`,
        },
      });
    } else {
      setUserName ({
        payload: {
          userName: 'Unknown User',
        },
      });
    }
    history.push(`/productPage`);
    
  }

  

  render () {
    const {
      isLoading,
      isInitialLoading,
      genderTypes,
      phoneTypes,
      states,
    } = this.state;
    // const isInitialLoading = false;
     const {highContrast} = this.props;
     const containerStyle = highContrast ? styles.darkContainer : null;
    
    return (
      <div className={cn (styles.container, containerStyle)}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>SignUp</title>
        </Helmet>
        {isInitialLoading
          ? <Spinner />
          : 
          <div className={styles.heading}>
              <h1 className={styles.heroText}>Sign Up</h1>
              <p className={styles.heroSubText}>
              If you already have an account,{' '}
                <Link
                  className={styles.link}
                 to={'signIn'}
                >
                  Sign In.
                </Link>
              </p>
              <div className={styles.heroImageOverlay}>
                <SignUpForm
                  genderTypes={genderTypes}
                  getBrokerInfo={null}
                  handleCSISuccess={this.handleCSISuccess}
                  highContrast={highContrast}
                  loading={isLoading}
                  onSubmit={this.handleSubmit}
                  phoneTypes={phoneTypes}
                  securityQuestions={null}
                  states={states}
                />
              </div>
              </div>}
              </div>
            
    );
  }
}

SignUpPage.propTypes = {
  change: PropTypes.bool.isRequired,
  customerInfo: PropTypes.shape ({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    middleInitial: PropTypes.string,
  }).isRequired,
  getBrokerInfo: PropTypes.arrayOf ({}).isRequired,
  getCustomerServiceInfo: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  history: PropTypes.shape ({
    location: PropTypes.shape ({
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape ({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
  registerCustomerRequest: PropTypes.func.isRequired,
  setAuthStatus: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  signUpInitialData: PropTypes.shape ({
    BrokerList: PropTypes.arrayOf (PropTypes.shape ({})),
    genderTypes: PropTypes.arrayOf (PropTypes.shape ({})),
    phoneTypes: PropTypes.arrayOf (PropTypes.shape ({})),
    securityQuestions: PropTypes.arrayOf (PropTypes.shape ({})),
    stateTypes: PropTypes.arrayOf (PropTypes.shape ({})),
  }).isRequired,
  accessCodeIncrement: PropTypes.func.isRequired,
  accessCodeCounter: PropTypes.number.isRequired,
};

SignUpPage.defaultProps = {};

const mapStateToProps = state => ({
  customerInfo: state.auth.customerInfo,
  highContrast: state.header.highContrast,
  signUpErrorMsg: state.form.signUp,
  signUpInitialData: state.auth.signUpInitialData,
  accessCodeCounter: state.auth.accessCodeCounter,
});

const mapDispatchToProps = {
  change,
  getCustomerServiceInfo,
  registerCustomerRequest,
  setAuthStatus,
  setUserName,
  accessCodeIncrement
};

export default connect (mapStateToProps, mapDispatchToProps) (SignUpPage);

