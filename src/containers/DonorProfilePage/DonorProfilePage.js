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
import { setAuthStatus, setUserName, savedonorStatusReducer } from '../../actions/Header';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Spinner from '../../components/Spinner/Spinner';
import styles from './DonorProfilePage.module.scss';
import { SaveDonorCard } from '../../components/SaveDonorCard/SaveDonorCard';
import Button from "../../components/Button/Button";
import SearchField from 'react-search-field';
import { getAllDonorsRequest, deleteDonorKindRequest,deleteDonorRequest } from '../../actions/Donors';


class DonorProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderTypes: [],
      isInitialLoading: true,
      isLoading: false,
      phoneTypes: [],
      states: [],
      donoarInformations: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleInitialAPICall();
  }

  handleInitialAPICall() {

    const { getAllDonorsRequest } = this.props;

    const res1 = new Promise((resolve, reject) =>
      getAllDonorsRequest({ reject, resolve })
    );
    res1.then(() => this.handleloadDonorList())
      .catch(error => {
        if (error.response.status === 400) {
          notify.show(`${error.response.data.message}`, 'error', 10000);
        } else {
          notify.show(` ${error}`, 'error', 5000);
        }
      });
  }

  handleloadDonorList = () => {
    const { donorsInformation } = this.props;
    this.setState({
      donoarInformations: donorsInformation,
      isInitialLoading: false
    });
  }


  handleDonations = () => {
    const { history } = this.props;
    history.push('/donationPage');
  }

  handleDonationDashBoard = () => {
    const { history } = this.props;
    history.push('/donorsDashboardPage');
  }

  onChange = (value) => {
    const { donorsInformation } = this.props;

    this.setState({
      donoarInformations: donorsInformation.filter(x => x.name === '' || x.name.toLowerCase().includes(value.toLowerCase()))
    });

  }

  handleEditSuccess = (value) => {
    const { history, savedonorStatusReducer } = this.props;
    savedonorStatusReducer({ payload: { isDonorCreated: false } });
    localStorage.setItem('donorId', value);
    history.push('/donorsDashboardPage');
  }

  handleEditDonorKind = (value) => {
    const { history } = this.props;
    sessionStorage.setItem('donorKindId', value);
    history.push('/donationPage');
  }

  handleDeleteConfirm = information => {
    notify.show(
      <div
        aria-hidden="true"
        aria-label="Are you sure you want to delete this Donor Information?"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        className={styles.alertMsg}
        id="exampleModal"
        role="dialog"
        title="Are you sure you want to delete this Goal?"
      >
        Are you sure you want to delete this Goal ?
        <div className={styles.alertBtn}>
          <Button
            autoFocus
            className={styles.alertDeleteBtn}
            onClick={() => this.handleDeleteSuccess(information)}
          >
            Delete
          </Button>

          <button
            className={styles.cancelBtn}
            onClick={notify.hide}
            type="submit"
          >
            Cancel
          </button>
        </div>
      </div>,
      'error',
      10000000
    );
  };

  handleDeleteSuccess = information => {

    notify.hide();
    if (information.donorType === 0) {
      this.handleDeleteDonorKind(information.id)
      this.componentDidMount();
    } else {
      this.handleDeleteDonor(information.id)
      this.componentDidMount();
    }
  };

  handleDeleteDonorKind = (value) => {
    const { deleteDonorKindRequest } = this.props;
    const res1 = new Promise((resolve, reject) =>
      deleteDonorKindRequest(
        {
          "id": value
        },
        { reject, resolve })
    );
    res1.then(() => this.componentDidMount())
      .catch(error => {
        if (error.response.status === 400) {
          notify.show(`${error.response.data.message}`, 'error', 10000);
        } else {
          notify.show(` ${error}`, 'error', 5000);
        }
      });

  }

  handleDeleteDonor = (value) => {
    const { deleteDonorRequest } = this.props;
    const res1 = new Promise((resolve, reject) =>
      deleteDonorRequest(
        {
          "id": value
        },
        { reject, resolve })
    );
    res1.then(() => this.componentDidMount())
      .catch(error => {
        if (error.response.status === 400) {
          notify.show(`${error.response.data.message}`, 'error', 10000);
        } else {
          notify.show(` ${error}`, 'error', 5000);
        }
      });

  }

  render() {
    const {
      isLoading,
      isInitialLoading,
      genderTypes,
      phoneTypes,
      states,
      donoarInformations
    } = this.state;
    // const isInitialLoading = false;
    const { highContrast } = this.props;
    const containerStyle = highContrast ? styles.darkContainer : null;

    return (
      <div className={cn(styles.container, containerStyle)}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Donor Profile</title>
        </Helmet>
        {isInitialLoading
          ? <Spinner />
          :
          <div className={styles.container}>
            <h2 className={styles.heroText}>Donors Information</h2>
            <h1 className={styles.heroSubText}>
              Donors Profiles
            </h1>
            {/* {donoarInformations.length>0?( */}
            <SearchField
              placeholder='Search Donors'
              onChange={(value) => this.onChange(value)}
              classNames={styles.profileSearchBox}
            />
            {/* // ):null} */}

           {donoarInformations.length>0?( <div className={styles.profileContainer}>
              {donoarInformations.map(item => (
                <SaveDonorCard
                  information={item}
                  handleEditSuccess={this.handleEditSuccess}
                  handleEditDonorKind={(value) => this.handleEditDonorKind(value)}
                  handleDeleteConfirm={(value) => this.handleDeleteConfirm(value)}
                />
              ))}
            </div>):( <div className={styles.noDonorProfileTile}><h1 className={styles.heroSubText}>
              No Donors Profiles found. Please create donor profile.
            </h1></div>)}
            <div className={styles.buttonsdisplay}>
              <Button className={styles.buttonStyle} onClick={() => this.handleDonationDashBoard()}>Donor Profile</Button>
              <Button className={styles.buttonStyle} onClick={() => this.handleDonations()}>Donations Of Kind</Button>
            </div>

          </div>}
      </div>

    );
  }
}

DonorProfilePage.propTypes = {
  change: PropTypes.bool.isRequired,
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
  getAllDonorsRequest: PropTypes.func.isRequired,
  savedonorStatusReducer: PropTypes.func.isRequired,
  deleteDonorKindRequest: PropTypes.func.isRequired,
  deleteDonorRequest: PropTypes.func.isRequired
};

DonorProfilePage.defaultProps = {
  getAllDonorsRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  highContrast: state.header.highContrast,
  donorsInformation: state.donor.donorsInformation.data,
  // isDonorCreated:state.header.isDonorCreated
});

const mapDispatchToProps = {
  change,
  getAllDonorsRequest,
  setAuthStatus,
  setUserName,
  savedonorStatusReducer,
  deleteDonorKindRequest,
  deleteDonorRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(DonorProfilePage);

