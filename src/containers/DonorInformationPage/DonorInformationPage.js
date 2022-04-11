import cn from 'classnames';
import PropTypes, { object } from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { change, reset } from 'redux-form';
import moment from 'moment';
import { scroller } from 'react-scroll';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import styles from './DonorInformationPage.module.scss';
import { SavedDonorsCard } from '../../components/SavedDonorsCard/SavedDonorsCard';
import DonorInformationForm from '../../components/DonorInformationForm/DonorInformationForm';
import { saveStakeHolderReducer, saveDonorRequest, getDonorByIdRequest, updateDonorRequest } from '../../actions/Donors';
import { savedonorStatusReducer } from '../../actions/Header';



const donationTypeList = [
    {
        Id: 1,
        Name: 'Corporate'
    },
    {
        Id: 2,
        Name: 'Individual'
    },
    {
        Id: 3,
        Name: 'Foundation'
    },
    {
        Id: 4,
        Name: 'Trust'
    },
    {
        Id: 5,
        Name: 'PSU'
    },
];

const donationCategoryList = [
    {
        id: 1,
        name: "FCRA"
    },
    {
        id: 2,
        name: "Domestic"
    }
];

const sourceOfPayment = [
    {
        Id: 1,
        Name: "Cheques"
    },
    {
        Id: 2,
        Name: "NEFT"
    },
    {
        Id: 3,
        Name: "IMPS"
    },
    {
        Id: 4,
        Name: "RTGS"
    },
    {
        Id: 5,
        Name: "DD"
    },
    {
        Id: 6,
        Name: "Debit"
    },
    {
        Id: 7,
        Name: "Card"
    },
    {
        Id: 8,
        Name: "Credit Card"
    },
    {
        Id: 9,
        Name: "Payment Gateways"
    },
    {
        Id: 10,
        Name: "Net Banking"
    },
];

const CityList = [
    {
        "id": 1,
        "name": "Mumbai"
    },
    {
        "id": 2,
        "name": "Delhi"
    },
    {
        "id": 3,
        "name": "Kolkata"
    },
    {
        "id": 4,
        "name": "Jaipur"
    },
    {
        "id": 5,
        "name": "Hyderabad"
    },
    {
        "id": 6,
        "name": "Vellore"
    },
    {
        "id": 7,
        "name": "Guwahati"
    },
    {
        "id": 8,
        "name": "Chennai"
    },
    {
        "id": 9,
        "name": "Varanasi"
    }
];

const purposeList = [
    {
        id: 1,
        Name: "Capex"
    },
    {
        id: 2,
        Name: "Opex"
    },
    {
        id: 3,
        Name: "Family Unit Sponsorship"
    },
    {
        id: 4,
        Name: "Sustainability"
    },
    {
        id: 5,
        Name: "Corpus"
    },
    {
        id: 6,
        Name: "Adhoc"
    }
];

const centerList = [

    {
        "locationId": 1,
        "id": 1,
        "name": "Mumbai 1 (Parel)"
    },
    {
        "locationId": 1,
        "id": 2,
        "name": "Mumbai 2 (Parel)"
    },
    {
        "locationId": 1,
        "id": 3,
        "name": "Mumbai 3 (Parel)"
    },
    {
        "locationId": 1,
        "id": 4,
        "name": "Mumbai 4 (Kharghar)"
    },
    {
        "locationId": 1,
        "id": 5,
        "name": "Mumbai 5 (Kharghar)"
    },
    {
        "locationId": 1,
        "id": 6,
        "name": "Mumbai 6 (Kharghar)"
    },
    {
        "locationId": 1,
        "id": 7,
        "name": "Mumbai 7 (Kharghar)"
    },
    {
        "locationId": 1,
        "id": 8,
        "name": "Mumbai 8 (Kim Verma)"
    },
    {
        "locationId": 1,
        "id": 9,
        "name": "Mumbai 9 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 10,
        "name": "Mumbai 10 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 11,
        "name": "Mumbai 11 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 12,
        "name": "Mumbai 12 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 13,
        "name": "Mumbai 13 ( Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 14,
        "name": "Mumbai 14 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 15,
        "name": "Mumbai 15 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 16,
        "name": "Mumbai 16 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 17,
        "name": "Mumbai 17 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 18,
        "name": "Mumbai 18 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 19,
        "name": "Mumbai 19 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 20,
        "name": "Mumbai 20 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 21,
        "name": "Mumbai 21 (Cotton Green)"
    },
    {
        "locationId": 1,
        "id": 22,
        "name": "Mumbai 22 (Cotton Green)"
    },
    {
        "locationId": 2,
        "id": 23,
        "name": "Delhi 1"
    },
    {
        "locationId": 2,
        "id": 24,
        "name": "Delhi 2"
    },
    {
        "locationId": 2,
        "id": 25,
        "name": "Delhi 3"
    },
    {
        "locationId": 2,
        "id": 26,
        "name": "Delhi 4"
    },
    {
        "locationId": 3,
        "id": 27,
        "name": "Kolkata 1 (Premashraya)"
    },
    {
        "locationId": 3,
        "id": 28,
        "name": "Kolkata 2 (Thakurpukur)"
    },
    {
        "locationId": 3,
        "id": 29,
        "name": "Kolkata 3 (Premashraya)"
    },
    {
        "locationId": 4,
        "id": 30,
        "name": "Jaipur 1"
    },
    {
        "locationId": 4,
        "id": 31,
        "name": "Jaipur 2"
    },
    {
        "locationId": 4,
        "id": 32,
        "name": "Jaipur 3"
    },
    {
        "locationId": 5,
        "id": 33,
        "name": "Hyderabad 1"
    }

];

const salutation = [

    {
        id: 1,
        Name: 'Mr.'
    },
    {
        id: 2,
        Name: 'Mrs.'
    },
    {
        id: 3,
        Name: 'Ms.'
    },
    {
        id: 4,
        Name: 'Messrs.'
    },
    {
        id: 5,
        Name: 'Dr.'
    },
];

const roleDecisionMaking = [
    {
        id: 1,
        name: "CEO",
    },
    {
        id: 2,
        name: "CLO",
    },
    {
        id: 3,
        name: "CFO",
    },
    {
        id: 4,
        name: "COO",
    },
    {
        id: 5,
        name: "CTO",
    },
    {
        id: 6,
        name: "Manager",
    },
    {
        id: 7,
        name: "Team Leader"
    }
];


class DonorInformationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false,
            isInitialLoading: false,
            isLoading: false,
            onLoadform: false,
            isGoalNameFieldEnabled: false,
            savedGoals: [],
            isIndividualSelected: false,
            isAddDonorOrReferred: false,
            stakeHolder: {},
            centerListState: [],
            donorsList: [],
            information: {},
            donorisNeedUpdate: false
        };
    }

    initialAPICall() {
    }

    componentDidMount() {

        const { saveStakeHolderReducer, getDonorByIdRequest, savedonorStatusReducer } = this.props;
        const donorId = sessionStorage.getItem('donorId');
        if (sessionStorage.saveStakeHolderReducer !== undefined) {
            var stakeHolderList = JSON.parse(sessionStorage.saveStakeHolderReducer);
            saveStakeHolderReducer(stakeHolderList);
            this.setState({ isInitialLoading: false })
        }
        if (donorId !== null) {
            this.setState({ isInitialLoading: true });
            const res = new Promise((resolve, reject) =>
                getDonorByIdRequest(
                    {
                        id: donorId,
                        donorTypeId: 1
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

    handleInitialLoad = () => {
        const { donorInfo, saveStakeHolderReducer } = this.props;
        sessionStorage.clear();
        saveStakeHolderReducer(donorInfo.stakeHolders);
        this.setState({
            isInitialLoading: false,
            information: donorInfo
        });
        this.handleCSISuccess();
    }

    handleCancelBtn = () => {
        const { reset, change } = this.props;

        //change('addGoalOrIncomeForm','goalPriority',goalPriorities[0].id);

        reset("addGoalOrIncomeForm");
        this.setState({
            onLoadform: false,
            endOfLifeChecked: false,
            asOfTodayChecked: false,
            asOfTargetChecked: false,
            clearDDValues: true
        });
        this.forceUpdate();
        scroller.scrollTo("Heading", {
            delay: 100,
            duration: 500,
            smooth: "easeInOutQuart",
        });

    }

    // handleEditSuccess = (values, information) => {

    //     const { change } = this.props;
    //     this.setState({
    //         goalId: information.id
    //     });

    //     change(
    //         'addGoalOrIncomeForm',
    //         'goalAmount',
    //         information ? information.GoalAmount.toString() : null
    //     );
    //     change(
    //         'addGoalOrIncomeForm',
    //         'atAge',
    //         information ? information.GoalStartAge.toString() : null
    //     );
    //     change(
    //         'addGoalOrIncomeForm',
    //         'tillAge',
    //         information ? information.GoalEndAge.toString() : null
    //     );
    //     change(
    //         'addGoalOrIncomeForm',
    //         'goalPriority',
    //         information ? information.GoalPriority : null
    //     );
    //     change(
    //         'addGoalOrIncomeForm',
    //         'goalInflationRate',
    //         information ? information.GoalInflationRate.toString() : null
    //     );
    //     change(
    //         'addGoalOrIncomeForm',
    //         'goalCategory',
    //         information ? information.GoalCategory : null
    //     );
    //     change(
    //         'addGoalOrIncomeForm',
    //         'goalBucket',
    //         information ? information.GoalBucket__id : null
    //     );
    //     change(
    //         'addGoalOrIncomeForm',
    //         'goalFrequency',
    //         information ? information.GoalFrequency : null
    //     );
    //     change(
    //         'addGoalOrIncomeForm',
    //         'goalName',
    //         information ? information.GoalName : null
    //     );
    //     change(
    //         'addGoalOrIncomeForm',
    //         'goalName',
    //         information ? information.GoalName : null
    //     );

    //     change(
    //         'addGoalOrIncomeForm',
    //         'goalInflationRate',
    //         information ? information.GoalInflationRate : null
    //     );

    //     change(
    //         'addGoalOrIncomeForm',
    //         'goalType',
    //         information ? information.GoalType : null
    //     );

    //     if (information.GoalCategory__Name === "Others") {
    //         this.setState({
    //             isGoalNameFieldEnabled: true,
    //             atAgeDisabled: false,
    //             isInflectionRateHidden: true,
    //             isGoalNameFieldShow: true
    //         });
    //     }

    //     this.setState({
    //         endOfLifeChecked: information.EndOfLife,
    //         onLoadform: true
    //     });
    //     scroller.scrollTo('addGoalForm', {
    //         delay: 100,
    //         duration: 500,
    //         smooth: 'easeInOutQuart',
    //     });


    // };

    handleDeleteConfirm = information => {
        notify.show(
            <div
                aria-hidden="true"
                aria-label="Are you sure you want to delete this Goal?"
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

    handleCreateStakeHolder() {

        this.setState({
            isAddDonorOrReferred: !this.state.isAddDonorOrReferred
        },
            () => {
                scroller.scrollTo("AddStakeHolder", {
                    delay: 100,
                    duration: 500,
                    smooth: "easeInOutQuart",
                });
            });
    }

    handleLoad(value) {
        const { change } = this.props;
        this.setState({
            isIndividualSelected: value === 1 ? false : true
        });
    }

    handlecenter(value) {
        this.setState({
            centerListState: centerList.filter(x => x.locationId === value)
        });
    }

    handleDeleteSuccess = information => {
        
    };


    saveStakeHolderInfo = (event) => {

        //event.preventDefault();
        var stakeHolderObje = JSON.parse(sessionStorage.stakeHolder);
        const { saveStakeHolderReducer, donorStakeHolders, change, reset } = this.props;
        var stakeHoldersList = new Array();

        stakeHoldersList = [...donorStakeHolders];
        if (stakeHolderObje !== undefined) {
            let roleName = stakeHolderObje.setRoles !== 0 ? roleDecisionMaking.find(x => x.id === stakeHolderObje.setRoles) : "Nothing";
            var stakeHolder = {
                decisionMakingRole: roleName !== "Nothing" ? roleName.name : "Nothing",
                name: stakeHolderObje.userName,
                donorRelationShip: stakeHolderObje.releationShip,
                designation: stakeHolderObje.designation,
                company: stakeHolderObje.company,
                mobileNo: stakeHolderObje.mobileNumber,
                decisionMaker: stakeHolderObje.decisionMaker === "true" ? true : false,
                salutation: stakeHolderObje.saluation,
                emailId: stakeHolderObje.emailId,
                address: stakeHolderObje.address,
                dob: moment(stakeHolderObje.dateOfBirth).format("yyyy-MM-DD"),
            }
            stakeHoldersList.push(stakeHolder);
            saveStakeHolderReducer(stakeHoldersList);
            sessionStorage.setItem('saveStakeHolderReducer', JSON.stringify(stakeHoldersList));
            reset("StakeHolderInformationForm");
            scroller.scrollTo("Heading", {
                delay: 100,
                duration: 500,
                smooth: "easeInOutQuart",
            });
        }



    }

    handleUpdateSubmit = (values) => {

        const { updateDonorRequest } = this.props;
        const { information } = this.state;
        var donorType = donationTypeList.find(x => x.Id === values.donationType).Name;
        var donorCategory = donationCategoryList.find(x => x.id === values.donationCategory).name;
        var sourceOfPayments = sourceOfPayment.find(x => x.Id === values.sourceofpayment).Name;
        var purposeLists = purposeList.find(x => x.id === values.purpose).Name;

        const res = new Promise((resolve, reject) =>
        updateDonorRequest(
                {
                    "id": information.id,
                    "donorId": information.donorId,
                    "type": donorType,
                    "name": values.donorName,
                    "panCard": values.pancard,
                    "category": donorCategory,
                    "referedBy": values.donorReffered,
                    "relationShipManager": values.releationShipManager,
                    "sourceOfPayment": sourceOfPayments,
                    "purpose": purposeLists,
                    "location": values.donorPreferredLocation,
                    "centre": values.center,
                    "comment": values.commentsRemarks,
                    "followUpDate": moment(values.followUpDate).format("yyyy-MM-DD"),
                    "donorType":1
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

    handleSubmit = (values) => {
        const { donorisNeedUpdate } = this.state;
        if (donorisNeedUpdate === false) {
            this.setState({isLoading:true});
            this.handleSave(values);
        } else {
            this.handleUpdateSubmit(values);
        }
    }

    handleSave = (values) => {
        const { saveDonorRequest, donorStakeHolders } = this.props;
        var donorType = donationTypeList.find(x => x.Id === values.donationType).Name;
        var donorCategory = donationCategoryList.find(x => x.id === values.donationCategory).name;
        var sourceOfPayments = sourceOfPayment.find(x => x.Id === values.sourceofpayment).Name;
        var purposeLists = purposeList.find(x => x.id === values.purpose).Name;
        const res = new Promise((resolve, reject) =>
            saveDonorRequest(
                {
                    "type": donorType,
                    "name": values.donorName,
                    "panCard": values.pancard,
                    "category": donorCategory,
                    "referedBy": values.donorReffered,
                    "relationShipManager": values.releationShipManager,
                    "sourceOfPayment": sourceOfPayments,
                    "purpose": purposeLists,
                    "location": values.donorPreferredLocation,
                    "centre": values.center,
                    "comment": values.commentsRemarks,
                    "followUpDate": moment(values.followUpDate).format("yyyy-MM-DD"),
                    "stakeHolders": donorStakeHolders
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


    handleCSISuccess = () => {
        const { change, donorInfo } = this.props;
        const { information } = this.state;
        if (Object.keys(information).length !== 0) {

            this.setState({ donorisNeedUpdate: true });

            this.handlecenter(information.location)
            change(
                'donorInformation',
                'donationType',
                information ? donationTypeList.find(x => x.Name === information.type).Id : null
            );
            change(
                'donorInformation',
                'donorName',
                information ? information.name : null
            );
            change(
                'donorInformation',
                'pancard',
                information ? information.panCard : null
            );
            change(
                'donorInformation',
                'donationCategory',
                information ? donationCategoryList.find(x => x.name === information.category).id : null
            );
            change(
                'donorInformation',
                'donorReffered',
                information ? information.referedBy : null
            );
            change(
                'donorInformation',
                'releationShipManager',
                information ? information.relationShipManager : null
            );
            change(
                'donorInformation',
                'sourceofpayment',
                information ? sourceOfPayment.find(x => x.Name === information.sourceOfPayment).Id : null
            );
            change(
                'donorInformation',
                'purpose',
                information ? purposeList.find(x => x.Name === information.purpose).id : null
            );

            change(
                'donorInformation',
                'donorPreferredLocation',
                information ? (information.location) : null
            );

            change(
                'donorInformation',
                'center',
                information ? (information.centre) : null
            );

            change(
                'donorInformation',
                'commentsRemarks',
                information ? information.comment

                    : null
            );

            change(
                'donorInformation',
                'followUpDate',
                information ? moment(information.followUpDate).format('MM/DD/yyyy')

                    : null
            );

            this.setState({
                isInitialLoading: false
            })
        }

    }


    handleSubmitSuccess = () => {
        const { history } = this.props;
        sessionStorage.clear();
        history.push("/donorProfilePage");
    }


    handleExit = () => {
        const { history } = this.props;
        history.push("/productHomePage");
    }

    render() {
        const {
            hasErrors,
            isInitialLoading,
            isLoading,
            isIndividualSelected,
            isAddDonorOrReferred,
            centerListState,
            donorisNeedUpdate
        } = this.state;

        const { donorStakeHolders, isDonorCreated } = this.props;

        // gaolLists.sort(function (a, b) { return a.GoalPriority - b.GoalPriority });
        return (
            <div className={styles.container} id="Skip-content">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Donors Management</title>
                </Helmet>
                {isInitialLoading ? (
                    <Spinner className={styles.spinner} />
                ) : (
                    <div className={cn(styles.subContainer)} name={'Heading'}>
                        <h1 className={styles.heroText}>Donors Informations</h1>
                        <div className={styles.heroSubText}>
                            This page allows you to View, Add, and Edit your Donors.
                        </div>
                        <h2 className={styles.textLight}>Saved Stakeholders</h2>
                        {donorStakeHolders.length === 0 ? (
                            <div className={styles.subContainer2}>
                                <div className={styles.heroSubText}>
                                    No Donors are found. Please create Donors.
                                </div>
                            </div>
                        ) : (
                            <div className={styles.subContainer2} name={'donorCard'}>
                                {donorStakeHolders.map((beneficiary, index) => (
                                    <SavedDonorsCard
                                        key={`SD_${index}`}
                                        handleDeleteSuccess={this.handleDeleteConfirm}
                                        handleEditSuccess={this.handleEditSuccess}
                                        information={beneficiary}
                                    />
                                ))}
                            </div>
                        )}

                        {/* {isAddDonorOrReferred === true ? ( */}
                        <div className={styles.subContainer} name="AddStakeHolder">
                            <DonorInformationForm
                                accountInformation={donorisNeedUpdate}
                                donationTypes={donationTypeList}
                                sourceOfPayment={sourceOfPayment}
                                cityList={CityList}
                                purposeList={purposeList}
                                centerList={centerListState}
                                salutation={salutation}
                                roleDecisionMaking={roleDecisionMaking}
                                donorCategories={donationCategoryList}
                                handleLoad={(value) => this.handleLoad(value)}
                                isIndividualSelected={isIndividualSelected}
                                onSubmit={this.handleSubmit}
                                saveStakeHolderInfo={(event) => this.saveStakeHolderInfo(event)}
                                handlecenter={(value) => this.handlecenter(value)}
                                handleCSISuccess={() => this.handleCSISuccess()}
                                loading={isLoading}
                            />
                        </div>
                    </div>
                )}
            </div>)
    }
}

// demo

DonorInformationPage.propTypes = {
    change: PropTypes.func.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
        push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    reset: PropTypes.func.isRequired,
    saveStakeHolderReducer: PropTypes.func.isRequired,
    donorStakeHolders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    getAllDonorsRequest: PropTypes.func.isRequired,
    saveDonorRequest: PropTypes.func.isRequired,
    getDonorByIdRequest: PropTypes.func.isRequired,
    isDonorCreated: PropTypes.bool.isRequired,
    savedonorStatusReducer: PropTypes.func.isRequired,
    updateDonorRequest: PropTypes.func.isRequired
};

DonorInformationPage.defaultProps = {
};

const mapStateToProps = state => ({
    donorStakeHolders: state.donor.donorStakeHolders,
    donorInfo: state.donor.donorInfo.data,
    isDonorCreated: state.header.isDonorCreated

});

const mapDispatchToProps = {
    change,
    reset,
    saveStakeHolderReducer,
    saveDonorRequest,
    getDonorByIdRequest,
    savedonorStatusReducer,
    updateDonorRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(DonorInformationPage);
