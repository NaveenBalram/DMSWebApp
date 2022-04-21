import cn from 'classnames';
import { change } from 'redux-form';
import PropTypes from 'prop-types';
import moment from 'moment';
import qs from 'query-string';
import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setAuthStatus, setUserName } from '../../actions/Header';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Spinner from '../../components/Spinner/Spinner';
import styles from './DonationPage.module.scss';
import { saveDonorKindRequest, getDonorByIdRequest, updateDonorKindRequest,getMasterDataRequest } from '../../actions/Donors';
import DonorProfilePage from '../DonorProfilePage/DonorProfilePage';


// const donationReceived = [
//   {
//     id: 1,
//     name: 'AMC Charges'
//   },
//   {
//     id: 2,
//     name: 'Books & Periodicals'
//   },
//   {
//     id: 3,
//     name: 'Laptop'
//   },
//   {
//     id: 4,
//     name: 'Computer'
//   },
//   {
//     id: 5,
//     name: 'Office Equipment'
//   },
//   {
//     id: 5,
//     name: 'Medicine'
//   }
// ];

class DonationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderTypes: [],
      isInitialLoading: false,
      isLoading: false,
      information: {},
      phoneTypes: [],
      states: [],
      isUpdated: false,
      donationReceived: []
    };
  }

  componentDidMount() {

    const { getDonorByIdRequest,masterDataLists } = this.props;
    const donorKindId = sessionStorage.getItem('donorKindId');
    this.initialAPICall();
  
    if (donorKindId !== null) {
      this.setState({
        isUpdated: true,
        isInitialLoading: true,
      });
     
      const res = new Promise((resolve, reject) =>
        getDonorByIdRequest(
          {
            id: donorKindId,
            donorTypeId: 0
          },
          { reject, resolve }
        )
      );
      res.then(() => this.handleInitialLoad());
      res.catch((error) => {
        notify.show(
          `An error occurred. ${error.response.data.Message}`,
          'error',
          5000
        );
      })
    }
  }

  initialAPICall() {
    const { getMasterDataRequest } = this.props;
    this.setState({ isLoading: true })
    const res = new Promise((resolve, reject) => getMasterDataRequest(
        { reject, resolve }
    ));
    res.then(() => this.handleMasterData());
    res.catch((error) => {
        notify.show(
            `An error occurred. ${error.response.data.Message}`,
            'error',
            5000
        );
    })
}
handleMasterData() {
  const { masterDataLists } = this.props;
  this.setState({ 
         isLoading:false,
         donationReceived:masterDataLists.donationReceived
      });

    }

  handleInitialLoad = () => {
    const { donorInfo } = this.props;
    sessionStorage.removeItem('donorKindId');
    this.setState({ information: donorInfo.data })
    if (donorInfo !== null) {
      this.handleCSISuccess(null)
    }

  }


  handleCSISuccess = value => {
    const { change } = this.props;
    const { information,donationReceived} = this.state;
    change(
      'signUp',
      'firstName',
      information ? information.firstName : null
    );
    change(
      'signUp',
      'lastName',
      information ? information.lastName : null
    );
    change(
      'signUp',
      'phoneNumber',
      information ? information.contactNo : null
    );
    change(
      'signUp',
      'email',
      information ? information.email : null
    );
    change(
      'signUp',
      'addressLine1',
      information ? information.address : null
    );
    change(
      'signUp',
      'donationRecieved',
      information ? donationReceived.find(x => x.value === information.donationReceived).id : null
    );
    change(
      'signUp',
      'quantity',
      information ? information.quantity : null
    );
    change(
      'signUp',
      'description',
      information ? information.description : null
    );

    this.setState({
      isInitialLoading: false
    })
  }

  handleSaveSubmit = values => {
    const { saveDonorKindRequest, history } = this.props;
    const { isUpdated,donationReceived } = this.state;
    this.setState({
      isLoading: true,
    });

    const res = new Promise((resolve, reject) =>
      saveDonorKindRequest(
        {
          "firstName": values.firstName,
          "lastName": values.lastName,
          "contactNo": values.phoneNumber,
          "email": values.email,
          "address": values.addressLine1,
          "donationReceived": donationReceived.find(x => x.id === values.donationRecieved).value,
          "quantity": values.quantity,
          "description": values.description
        },
        { reject, resolve }
      )
    );
    res.then(() => this.handleSubmitSuccess());
    res.catch(error => {
      notify.show(
        `An error occurred. ${error.response.data.Message}`,
        'error',
        5000
      );
      if (error.response.status === 400) {
        notify.show(
          `An error occurred. ${error.response.data.Message}`,
          'error',
          5000
        );
      } else {
        notify.show(
          `An error occurred. Please try again. Technical Information: ${error.response.data.Message}`,
          'error',
          5000
        );
      }
      this.setState({
        isLoading: false,
      });
    });
  }

  handleUpdateSubmit = values => {
    const { updateDonorKindRequest, history } = this.props;
    const { isUpdated, information,donationReceived } = this.state;
    this.setState({
      isLoading: true,
    });

    const res = new Promise((resolve, reject) =>
      updateDonorKindRequest(
        {
          "id": information.id,
          "donorId": information.donorId,
          "firstName": values.firstName,
          "lastName": values.lastName,
          "contactNo": values.phoneNumber,
          "email": values.email,
          "address": values.addressLine1,
          "donationReceived": donationReceived.find(x => x.id === values.donationRecieved).value,
          "quantity": values.quantity,
          "description": values.description
        },
        { reject, resolve }
      )
    );
    res.then(() => this.handleSubmitSuccess());
    res.catch(error => {
      notify.show(
        `An error occurred. ${error.response.data.Message}`,
        'error',
        5000
      );
      if (error.response.status === 400) {
        notify.show(
          `An error occurred. ${error.response.data.Message}`,
          'error',
          5000
        );
      } else {
        notify.show(
          `An error occurred. Please try again. Technical Information: ${error.response.data.Message}`,
          'error',
          5000
        );
      }
      this.setState({
        isLoading: false,
      });
    });
  }

  handleSubmit = values => {
    const { isUpdated } = this.state;

    if (isUpdated === true) {
      this.handleUpdateSubmit(values)
    } else {
      this.handleSaveSubmit(values)
    }
  }

  handleSubmitSuccess = () => {
    const { history } = this.props;
    history.push(`/donorProfilePage`);
  }

  render() {
    const {
      isLoading,
      isInitialLoading,
      isUpdated,
      donationReceived
    } = this.state;

    // const isInitialLoading = false;

    const { highContrast,masterDataLists } = this.props;
    const containerStyle = highContrast ? styles.darkContainer : null;

    //this.setState({donationReceived:masterDataLists.donationReceived})
  
    return (
      <div className={cn(styles.container, containerStyle)}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Donation of Kind Page</title>
        </Helmet>
        {isInitialLoading
          ? <Spinner />
          :
          <div className={styles.heading}>
            <h1 className={styles.heroText}>Donation of Kind</h1>
            <p className={styles.heroSubText}>
              Click here to go {' '}
              <Link
                className={styles.link}
                to={'donorProfilePage'}
              >
                back.
              </Link>
            </p>
            <div className={styles.heroImageOverlay}>
              <SignUpForm
                handleCSISuccess={this.handleCSISuccess}
                highContrast={highContrast}
                loading={isLoading}
                onSubmit={this.handleSubmit}
                donationTypes={donationReceived}
                accountInformation={isUpdated}
              />
            </div>
          </div>}
      </div>

    );
  }
}

DonationPage.propTypes = {
  change: PropTypes.bool.isRequired,
  customerInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    middleInitial: PropTypes.string,
  }).isRequired,
  getBrokerInfo: PropTypes.arrayOf({}).isRequired,
  getCustomerServiceInfo: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
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
  registerCustomerRequest: PropTypes.func.isRequired,
  setAuthStatus: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  signUpInitialData: PropTypes.shape({
    BrokerList: PropTypes.arrayOf(PropTypes.shape({})),
    genderTypes: PropTypes.arrayOf(PropTypes.shape({})),
    phoneTypes: PropTypes.arrayOf(PropTypes.shape({})),
    securityQuestions: PropTypes.arrayOf(PropTypes.shape({})),
    stateTypes: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  getAllDonorsRequest: PropTypes.func.isRequired,
  saveDonorKindRequest: PropTypes.func.isRequired,
  donorsInformation: PropTypes.arrayOf(PropTypes.shape({})),
  getDonorByIdRequest: PropTypes.func.isRequired,
  updateDonorKindRequest: PropTypes.func.isRequired,
  getMasterDataRequest:PropTypes.func.isRequired
};

DonationPage.defaultProps = {

  donorsInformation: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapStateToProps = state => ({
  highContrast: state.header.highContrast,
  donorsInformation: state.donor.donorsInformation.data,
  donorInfo: state.donor.donorInfo,
  masterDataLists: state.donor.masterDataLists
});

const mapDispatchToProps = {
  change,
  setAuthStatus,
  setUserName,
  saveDonorKindRequest,
  getDonorByIdRequest,
  updateDonorKindRequest,
  getMasterDataRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(DonationPage);

