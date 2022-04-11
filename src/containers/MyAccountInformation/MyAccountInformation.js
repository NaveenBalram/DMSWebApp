import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { change } from 'redux-form';
import { notify } from 'react-notify-toast';
import styles from './MyAccountInformation.module.scss';
import Spinner from '../../components/Spinner/Spinner';
import { getCustomerServiceInfo,authProviderRequest,updateCustomerDetailsRequest} from '../../actions/Auth';
import EditCustomerInfo from '../../components/EditCustomerInfo/EditCustomerInfo';

class MyAccountInformation extends Component {
  constructor() {
    super();
    this.state = {
      accountInformation: true,
      genderTypes: [],
      isInitialLoading: true,
      isLoading: false,
      phoneTypes: [],
      states: [],
    };
  }

  componentDidMount() {
    const {
      getCustomerServiceInfo,isAuthenticated,history
    } = this.props;
      
    if (!isAuthenticated) {
      history.push(`/signIn`);
    } 
      const res = new Promise((resolve, reject) => 
      getCustomerServiceInfo(
        { reject, resolve }
      )
    );
    res.then(() => this.handleCSISuccess());
    res.catch(error => {
      if (error.response.status === 400) {
        notify.show(`Invalid Credentials. Please try again.`, 'error', 5000);
      } else {
        notify.show(
          `An error occurred. Please try again. Technical Information: ${error}`,
          'error',
          3000
        );
      }
      this.setState({
        isLoading: false,
      });
    });
   
  }

  handleCSISuccess = (value) => {
    value = true;
    const { signUpInitialData, change,  customerInfo } = this.props;
    this.setState({
      genderTypes: signUpInitialData.genderDetails,
      phoneTypes: signUpInitialData.phoneTypeDetails,
      states: signUpInitialData.stateDetails,
      isInitialLoading: false
    });
   
    change(
      'editCustomerInfo',
      'accesscode',
      value ? customerInfo.AuthorizeCode : null
    );
    change(
      'editCustomerInfo',
      'firstName',
      value ? customerInfo.FirstName : null
    );
    change(
      'editCustomerInfo', 
      'middleName',
      value ? customerInfo.MiddleInitial : null
    );
    change(
      'editCustomerInfo',
      'lastName',
      value ? customerInfo.LastName : null
    );
    change(
      'editCustomerInfo',
      'dateOfBirth',
      value ? moment(customerInfo.BirthDate).format('MM/DD/YYYY') : null
    );
    change(
      'editCustomerInfo',
      'gender',
      value ? customerInfo.GenderID : null
    );
    change('editCustomerInfo', 'ssn', value ? customerInfo.SSN : null);
    change(
      'editCustomerInfo',
      'addressLine1',
      value ? customerInfo.Address1 : null
    );
    change(
      'editCustomerInfo',
      'addressLine2',
      value ? customerInfo.Address2 : null
    );
    change('editCustomerInfo', 'city', value ? customerInfo.CityName : null);
    change(
      'editCustomerInfo',
      'state',
      value ? customerInfo.StateAbbr : null
    );
    change(
      'editCustomerInfo',
      'zipcode',
      value ? customerInfo.Code : null
    );
    change(
      'editCustomerInfo',
      'phoneNumber',
      value ? customerInfo.Phone : null
    );
    change(
      'editCustomerInfo',
      'phoneType',
      value ? customerInfo.PhoneId : null
    );
    change(
      'editCustomerInfo',
      'alternatePhoneNumber',
      value ? customerInfo.Phone2 : null
    );
    change(
      'editCustomerInfo',
      'alternatePhoneType',
      value ? customerInfo.Phone2Id : null
    );
    change(
      'editCustomerInfo',
      'email',
      value ? customerInfo.EmailAddress : null
    );
    change(
      'editCustomerInfo',
      'reEnterEmail',
      value ? customerInfo.EmailAddress : null
    );
  };

  handleSubmit = (values) => {
    const { updateCustomerDetailsRequest, customerInfo } = this.props;
    this.setState({
      isLoading: true,
    });
    console.log("customerInfo", customerInfo)
  
    const dateFormate = moment (values.dateOfBirth).format ('YYYY-MM-DD');
    const isEmailSelected = localStorage.getItem('isEmailSelected');
    const res = new Promise((resolve, reject) => {
      updateCustomerDetailsRequest(
        {
          Address1: values.addressLine1,
          Address2: values.addressLine2,
          BirthDate: dateFormate,
          CityName: values.city,
          CustomerId: customerInfo.CustomerId,
          EmailAddress: values.email,
          EmailOptIn : isEmailSelected===null?customerInfo.EmailOptIn:isEmailSelected,
          FirstName: values.firstName,
          GenderID: values.gender,
          GroupAccountID: 1,
          LastName: values.lastName,
          MiddleInitial: values.middleName,
          Phone: values.phoneNumber,
          Phone2: values.alternatePhoneNumber,
          Phone2Id: values.alternatePhoneType,
          PhoneId: values.phoneType,
          code: values.zipcode,
          SSN: values.ssn,
          StateAbbr: values.state,
          AuthorizeCode: values.accesscode,
        },
        { reject, resolve }
      )
    }
    );
    res.then(() => this.handleSuccess());
    res.catch((error) => {
      if (error.response.status === 400) {
        notify.show(
          `An error occurred. ${error.response.data.errorMessage}`,
          'error',
          5000
        );
      } else {
        notify.show(
          `An error occurred. Please try again. Technical Information: ${error}`,
          'error',
          5000
        );
      }
      this.setState({
        isLoading: false,
      });
    });
  }

  

  handleSuccess = () => {
    const { history } = this.props;
    this.setState({
      isLoading: false,
    });

    const myColor = { background: '#43A047', text: '#FFFFFF' };
    notify.show(
      `Information has been successfully updated. Thank you`,
      `custom`,
      5000,
      myColor
    );

    history.push(`/productPage/${history.location.search}`);
    this.setState({
      isLoading: true,
    })
  };

  render() {
    const {
      isInitialLoading,
      isLoading,
    } = this.state;
    const { customerInfo,signUpInitialData} = this.props;
    console.log(signUpInitialData);
    return (
      <div className={styles.container}>
        {isInitialLoading ? (
          <Spinner className={styles.spinner} />
        ) : (
          <div className={styles.subContainer}>
            <h1 className={styles.heroText}>Account Information</h1>
            <EditCustomerInfo
              highContrast = {null}
              customerDetails = {customerInfo}
              genderTypes={signUpInitialData.genderTypes}
              handleCSISuccess={this.handleCSISuccess}
              loading={isLoading}
              onSubmit={this.handleSubmit}
              phoneTypes={signUpInitialData.phoneTypes}
              states={signUpInitialData.stateTypes}
            />
          </div>
        )}
      </div>
    );
  }
}

MyAccountInformation.propTypes = {
  change: PropTypes.func.isRequired,
  authProviderRequest: PropTypes.func.isRequired,
  customerInfo: PropTypes.arrayOf({
    AddressLine1: PropTypes.string,
    AddressLine2: PropTypes.string,
    BirthDate: PropTypes.string,
    CityName: PropTypes.string,
    CustomerID: PropTypes.number,
    ContactEmail: PropTypes.string,
    FirstName: PropTypes.string,
    GenderID: PropTypes.number,
    LastName: PropTypes.string,
    LoginPWD: PropTypes.string,
    MiddleInitial: PropTypes.string,
    Password: PropTypes.string,
    CellPhone: PropTypes.string,
    OtherPhone: PropTypes.string,
    OtherPhoneId: PropTypes.string,
    CellPhoneId: PropTypes.string,
    Code: PropTypes.string,
    SSN: PropTypes.string,
    StateAbbr: PropTypes.string,
  }),
  customerId: PropTypes.number.isRequired,
  getCustomerServiceInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signUpInitialData: PropTypes.shape({
    genderTypes: PropTypes.arrayOf(PropTypes.shape({})),
    phoneTypes: PropTypes.arrayOf(PropTypes.shape({})),
    stateTypes: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  updateCustomerDetailsRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  customerInfo: state.auth.customerInfo,
  highContrast: state.header.highContrast,
  isAuthenticated: state.header.isAuthenticated,
  signUpInitialData: state.auth.signUpInitialData,
});

const mapDispatchToProps = {
  change,
  getCustomerServiceInfo,
  authProviderRequest,
  updateCustomerDetailsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  MyAccountInformation
);
