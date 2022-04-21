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
import {
    saveStakeHolderReducer, saveDonorRequest, getDonorByIdRequest, updateDonorRequest, getMasterDataRequest, UpdateStakeHolderRequest,
    saveStakeHolderRequest, deleteStakeHolderRequest
} from '../../actions/Donors';
import { savedonorStatusReducer } from '../../actions/Header';
import StakeHolderForm from '../../components/StakeHolderForm/StakeHolderForm';


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
            donorisNeedUpdate: false,
            donationTypeList: [],
            donationCategoryList: [],
            sourceOfPayment: [],
            CityList: [],
            purposeList: [],
            centerList: [],
            salutation: [],
            roleDecisionMaking: [],
            stakeHolderEdit: false,
            stakeHolderAddNew: true,
            decisionMaker: false,
            accountInformation: false,
            stakeHolderId: 0,

        };
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
        this.setState(
            {
                isLoading: false,
                donationTypeList: masterDataLists.donorType,
                sourceOfPayment: masterDataLists.sourceOfPayment,
                donationCategoryList: masterDataLists.donorCategory,
                salutation: masterDataLists.salutation,
                CityList: masterDataLists.locations,
                purposeList: masterDataLists.purpose,
                roleDecisionMaking: masterDataLists.roles,


            });
    }

    componentDidMount() {
        this.initialAPICall();
        this.handleApiCalls();
    }

    handleApiCalls = () => {
        const { saveStakeHolderReducer, getDonorByIdRequest } = this.props;
        const donorId = localStorage.getItem('donorId');
        if (sessionStorage.saveStakeHolderReducer !== undefined) {
            var stakeHolderList = JSON.parse(sessionStorage.saveStakeHolderReducer);
            saveStakeHolderReducer(stakeHolderList);
            this.setState({ isInitialLoading: false })
        }
        if (donorId !== null) {
            this.setState({ isInitialLoading: true, accountInformation: true });
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
            information: donorInfo,
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

    handleEditSuccess = (values, information) => {

        const { change } = this.props;
        const { roleDecisionMaking, salutation } = this.state;
        const roles = roleDecisionMaking.find(x => x.value === information.decisionMakingRole);
        const saluations = salutation.find(x => x.value === (information.salutation === null ? 'Mr.' : information.salutation));


        change(
            'StakeHolderForm',
            'roleName',
            information ? roles.id : null
        );
        change(
            'StakeHolderForm',
            'saluation',
            information ? saluations.id : null
        );
        change(
            'StakeHolderForm',
            'stakeHolderName',
            information ? information.name : null
        );
        change(
            'StakeHolderForm',
            'dateOfBirth',
            information ? moment(information.dob).format('MM/DD/yyyy') : null
        );
        change(
            'StakeHolderForm',
            'mobileNumber',
            information ? information.mobileNo : null
        );
        change(
            'StakeHolderForm',
            'designation',
            information ? information.designation : null
        );
        change(
            'StakeHolderForm',
            'company',
            information ? information.company : null
        );
        change(
            'StakeHolderForm',
            'email',
            information ? information.emailId : null
        );
        change(
            'StakeHolderForm',
            'address',
            information ? information.address : null
        );

        this.setState({
            stakeHolderEdit: true,
            decisionMaker: information.decisionMaker,
            accountInformation: true,
            stakeHolderId: information.id,
            stakeHolderAddNew: false,

        },
            () => {
                scroller.scrollTo("AddStakeHolder", {
                    delay: 100,
                    duration: 500,
                    smooth: "easeInOutQuart",
                });
            });
    };


    handleDeleteConfirm = information => {
        notify.show(
            <div
                aria-hidden="true"
                aria-label="Are you sure you want to delete this Stake Holder?"
                aria-labelledby="exampleModalLabel"
                aria-modal="true"
                className={styles.alertMsg}
                id="exampleModal"
                role="dialog"
                title="Are you sure you want to delete this Stake Holder?"
            >
                Are you sure you want to delete this Stake Holder ?
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

    handleDeleteSuccess = (information) => {
        notify.hide();
        const { deleteStakeHolderRequest } = this.props;
        const res1 = new Promise((resolve, reject) =>
            deleteStakeHolderRequest(
                {
                    "id": information.id
                },
                { reject, resolve })
        );
        res1.then(() => this.handleGetDonorsList(parseInt(localStorage.getItem('donorId'))))
            .catch(error => {
                if (error.response.status === 400) {
                    notify.show(`${error.response.data.message}`, 'error', 10000);
                } else {
                    notify.show(` ${error}`, 'error', 5000);
                }
            });
    }


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
            isIndividualSelected: value === 11 ? true : false
        });
    }

    handlecenter(value) {
        this.setState({
            centerListState: centerList.filter(x => x.locationId === value)
        });
    }


    saveStakeHolderInfo = (event) => {

        //event.preventDefault();
        var stakeHolderObje = JSON.parse(sessionStorage.stakeHolder);
        const { saveStakeHolderReducer, donorStakeHolders, change, reset } = this.props;
        var stakeHoldersList = new Array();
        const { roleDecisionMaking } = this.state;

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
        const { information, donationTypeList, sourceOfPayment, purposeList, donationCategoryList } = this.state;
        var donorType = donationTypeList.find(x => x.id === values.donationType).value;
        var donorCategory = donationCategoryList.find(x => x.id === values.donationCategory).value;
        var sourceOfPayments = sourceOfPayment.find(x => x.id === values.sourceofpayment).value;
        var purposeLists = purposeList.find(x => x.id === values.purpose).value;
        this.setState({isLoading:true})

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
                    "donorType": 1
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
        const { donorisNeedUpdate, stakeHolderEdit, accountInformation, stakeHolderAddNew } = this.state;

        if (stakeHolderEdit === true) {
            if (accountInformation === true && stakeHolderAddNew === false) {
                this.setState({ isLoading: true });
                this.handleUpdateStakeHolder(values);
            } else {
                if (stakeHolderAddNew === true && accountInformation === true) {
                    this.setState({ isLoading: true });
                    this.handleAddStakeHolder(values);
                }
            }
        } else {
            if (donorisNeedUpdate === false) {
                this.setState({ isLoading: true });
                this.handleSave(values);
            } else {
                this.handleUpdateSubmit(values);
            }
        }

    }

    handleSave = (values) => {
        const { saveDonorRequest, donorStakeHolders } = this.props;
        const { donationTypeList, sourceOfPayment, donationCategoryList, purposeList } = this.state;

        var donorType = donationTypeList.find(x => x.id === values.donationType).value;
        var donorCategory = donationCategoryList.find(x => x.id === values.donationCategory).value;
        var sourceOfPayments = sourceOfPayment.find(x => x.id === values.sourceofpayment).value;
        var purposeLists = purposeList.find(x => x.id === values.purpose).value;
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

    handleCancelBtn = () => {
        const { reset, history, saveStakeHolderReducer } = this.props;
        localStorage.clear();
        sessionStorage.clear();
        const stakeHolderList = [];
        saveStakeHolderReducer(stakeHolderList);
        reset('donorInformation');
        history.push('/donorProfilePage');
    }

    handleCSISuccess = () => {
        const { change, donorInfo } = this.props;
        const { information, donationTypeList, donationCategoryList, sourceOfPayment, purposeList } = this.state;

        if (Object.keys(information).length !== 0 && donationTypeList.length !== 0 && donationCategoryList.length != 0 && sourceOfPayment.length !== 0) {

            this.setState({ donorisNeedUpdate: true });
            this.handlecenter(information.location)
            change(
                'donorInformation',
                'donationType',
                information ? donationTypeList.find(x => x.value === information.type).id : null
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
                information ? donationCategoryList.find(x => x.value === information.category).id : null
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
                information ? sourceOfPayment.find(x => x.value === information.sourceOfPayment).id : null
            );
            change(
                'donorInformation',
                'purpose',
                information ? purposeList.find(x => x.value === information.purpose).id : null
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
                isInitialLoading: false,
                stakeHolderEdit: false,
                stakeHolderAddNew: true
                // accountInformation:false
            },
                () => {
                    scroller.scrollTo("donorCard", {
                        delay: 100,
                        duration: 500,
                        smooth: "easeInOutQuart",
                    });
                });
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
    //StakeHolders

    handleUpdateStakeHolder = (values) => {
        const { UpdateStakeHolderRequest } = this.props;
        const { stakeHolderId, roleDecisionMaking, salutation } = this.state;

        const res = new Promise((resolve, reject) =>
            UpdateStakeHolderRequest(
                {
                    "id": stakeHolderId,
                    "donorId": parseInt(localStorage.getItem('donorId')),
                    "decisionMakingRole": roleDecisionMaking.find(x => x.id === values.roleName).value,
                    "donorRelationShip": "",
                    "salutation": salutation.find(x => x.id === values.saluation).value,
                    "name": values.stakeHolderName,
                    "designation": values.designation,
                    "company": values.company,
                    "emailId": values.email,
                    "mobileNo": values.mobileNumber,
                    "address": values.address,
                    "dob": moment(values.dateOfBirth).format("yyyy-MM-DD"),
                    "decisionMaker": localStorage.getItem('isEmailSelected') === 'true' ? true : false
                },
                { reject, resolve }
            ));
        res.then(() => this.handleGetDonorsList(parseInt(localStorage.getItem('donorId'))));
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
                stakeHolderEdit: false
            });
        });

    }

    handleAddStakeHolder = (values) => {

        const { saveStakeHolderRequest } = this.props;
        const { roleDecisionMaking, salutation } = this.state;
        const res = new Promise((resolve, reject) =>
            saveStakeHolderRequest(
                {
                    "donorId": parseInt(localStorage.getItem('donorId')),
                    "decisionMakingRole": roleDecisionMaking.find(x => x.id === values.roleName).value,
                    "donorRelationShip": "",
                    "salutation": salutation.find(x => x.id === values.saluation).value,
                    "name": values.stakeHolderName,
                    "designation": values.designation,
                    "company": values.company,
                    "emailId": values.email,
                    "mobileNo": values.mobileNumber,
                    "address": values.address,
                    "dob": moment(values.dateOfBirth).format("yyyy-MM-DD"),
                    "decisionMaker": localStorage.getItem('isEmailSelected') === 'true' ? true : false
                },
                { reject, resolve }
            ));
        res.then(() => this.handleGetDonorsList(parseInt(localStorage.getItem('donorId'))));
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
                //stakeHolderEdit:false
            });
        });



    }

    handleGetDonorsList = (donorId) => {
        const { getDonorByIdRequest } = this.props;
        this.setState({
            isLoading: false, isInitialLoading: true
        });
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

    handleStakeHolderCancelBtn = () => {
        this.setState({ stakeHolderEdit: false, stakeHolderAddNew: true });
        this.handleCSISuccess()
    }

    handleAddStakeHolderBtn = () => {
        this.setState({ stakeHolderEdit: true, stakeHolderAddNew: true });
    }


    render() {
        const {
            accountInformation,
            hasErrors,
            isInitialLoading,
            isLoading,
            isIndividualSelected,
            isAddDonorOrReferred,
            centerListState,
            donorisNeedUpdate,
            donationTypeList,
            sourceOfPayment,
            purposeList,
            donationCategoryList,
            roleDecisionMaking,
            CityList,
            salutation,
            stakeHolderEdit,
            decisionMaker,
            stakeHolderAddNew
        } = this.state;

        const { donorStakeHolders } = this.props;

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
                        <div className={styles.containerflexbox}>
                            <h2 className={styles.textLight}>Saved Stakeholders</h2>
                            {accountInformation === true && stakeHolderAddNew === true ? (<div className={styles.ImageContainer} onClick={this.handleAddStakeHolderBtn}>
                                <img src={require(`../../assets/img/stakeholders.png`)} />
                                <span className={styles.caption}>Add New StakeHolder</span>
                            </div>) : (null)}
                        </div>
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
                        {stakeHolderEdit === false ? (<div className={styles.subContainer} name="AddStakeHolder">
                            <DonorInformationForm
                                accountInformation={accountInformation}
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
                                handleCancelBtn={this.handleCancelBtn}
                            />
                        </div>) : (<div className={styles.subContainer} name="AddStakeHolder">
                            <StakeHolderForm
                                salutation={salutation}
                                roleDecisionMaking={roleDecisionMaking}
                                isIndividualSelected={isIndividualSelected}
                                decisionMaker={decisionMaker}
                                onSubmit={this.handleSubmit}
                                handleStakeHolderCancelBtn={this.handleStakeHolderCancelBtn}
                                accountInformation={!stakeHolderAddNew}
                                loading={isLoading}
                            />
                        </div>)}
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
    updateDonorRequest: PropTypes.func.isRequired,
    getMasterDataRequest: PropTypes.func.isRequired,
    saveStakeHolderRequest: PropTypes.func.isRequired,
    UpdateStakeHolderRequest: PropTypes.func.isRequired,
    deleteStakeHolderRequest: PropTypes.func.isRequired,
};

DonorInformationPage.defaultProps = {
};

const mapStateToProps = state => ({
    donorStakeHolders: state.donor.donorStakeHolders,
    donorInfo: state.donor.donorInfo.data,
    isDonorCreated: state.header.isDonorCreated,
    masterDataLists: state.donor.masterDataLists
});

const mapDispatchToProps = {
    change,
    reset,
    saveStakeHolderReducer,
    saveDonorRequest,
    getDonorByIdRequest,
    savedonorStatusReducer,
    updateDonorRequest,
    getMasterDataRequest,
    saveStakeHolderRequest,
    UpdateStakeHolderRequest,
    deleteStakeHolderRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(DonorInformationPage);
