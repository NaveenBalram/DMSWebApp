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
import styles from './DonorProposalPage.module.scss';
import Budget from '../../components/Budget/Budget';
import FamilyUnitProposal from '../../components/FamilyUnitProposal/FamilyUnitProposal';
import { SavedProposalCard } from '../../components/SavedProposalCard/SavedProposalCard';
import { getDonorByIdRequest } from '../../actions/Donors';
import {
    getProposalByDonorIdRequest, saveProposalFamilyUnitRequest, updateProposalFamilyUnitRequest, deleteProposalByIdRequest,
    getProposalsByDonorIdRequest, saveProposalRequest, updateProposalRequest, deleteProposalsByIdRequest, getBudgetProposalByProposalIdRequest
} from '../../actions/Proposal';
import { parseInt } from 'lodash';




const a = [
    {
        id: 0,
        refNo: 1.1,
        activityName: 'PERSONAL PROGRAM',
        budgetAmount: 100000,

    },
    {
        id: 1,
        refNo: 1.2,
        activityName: 'CENTRE RUNNING',
        budgetAmount: 86000
    },
    {
        id: 2,
        refNo: 2.1,
        activityName: 'CAPITAL COST',
        budgetAmount: 200000
    },
    {
        id: 3,
        refNo: 3.1,
        activityName: 'HYGIENIC STAY',
        budgetAmount: 60000
    },
    {
        id: 4,
        refNo: 3.2,
        activityName: 'NUTRITIOUS FOOD',
        budgetAmount: 40000
    },
    {
        id: 5,
        refNo: 3.3,
        activityName: 'TRANSPORTATION',
        budgetAmount: 30000
    },
    {
        id: 6,
        refNo: 3.4,
        activityName: 'MEDICAL ASSISTANCE',
        budgetAmount: 50000
    },
    {
        id: 7,
        refNo: 3.5,
        activityName: 'EMOTIONAL WELL-BEING',
        budgetAmount: 30000
    },
    {
        id: 8,
        refNo: 3.6,
        activityName: 'CELEBRATIONS AND RECREATIONS',
        budgetAmount: 90000
    },
    {
        id: 9,
        refNo: 3.7,
        activityName: 'SKILL TRAINING',
        budgetAmount: 40000
    },
    {
        id: 10,
        refNo: 3.8,
        activityName: 'EDUCATION ACTIVITIES FOR CHILDREN',
        budgetAmount: 20000
    },
    {
        id: 11,
        refNo: 4.1,
        activityName: 'OVERHEAD EXPENSES',
        budgetAmount: 100000
    },
    {
        id: 12,
        refNo: 5.1,
        activityName: 'MODEL CENTRES',
        budgetAmount: 115000
    },
    {
        id: 13,
        refNo: '',
        activityName: 'Total Budget',
        budgetAmount: 912000
    }
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

const numberOfUnit = new Array(12).fill(1).map(function (val, index) {
    return {
        "name": index + 1,
        "id": index + 1
    }
});

const units = new Array(17).fill(1).map(function (val, index) {
    var value = (index + 1)
    return {
        "name": `M${value}`,
        "id": index + 1
    }
});


class DonorProposalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false,
            isInitialLoading: false,
            isLoading: false,
            onLoadform: false,
            centerListState: [],
            donorsList: [],
            information: {},
            isAddProposalEnabled: false,
            proposalisNeedUpdate: false,
            singage: false,
            cityList: [],
            donorProposalLists: [],
            donorFinanceProposalists: [],
            accountInformation: false,
            propspectId: 0,
            budgetTotal: 0,
        };
    }

    initialAPICall() {
    }

    componentDidMount() {

        this.initialDonorsCalls();

    }

    initialDonorsCalls() {
        const { getDonorByIdRequest, getProposalByDonorIdRequest, getProposalsByDonorIdRequest } = this.props;
        const donorId = localStorage.getItem('donorId');
        if (donorId !== null) {
            this.setState({ isInitialLoading: true });
            const res = new Promise((resolve, reject) => getDonorByIdRequest(
                {
                    id: donorId,
                    donorTypeId: 1
                },
                { reject, resolve }
            ));
            const res1 = new Promise((resolve, reject) => getProposalByDonorIdRequest(
                {
                    donorId: donorId
                },
                { reject, resolve }
            ));
            const res2 = new Promise((resolve, reject) => getProposalsByDonorIdRequest(
                {
                    donorId: donorId
                },
                { reject, resolve }
            ));
            Promise.all([res, res1, res2]).then(() => this.handleInitialLoad());
            res.catch((error) => {
                notify.show(
                    `An error occurred. ${error.response.data.Message}`,
                    'error',
                    5000
                );
            });
        }
    }

    handleInitialLoad = () => {
        const { donorInfo, change, donorProposalLists, donorFinanceProposalists } = this.props;
        sessionStorage.clear();

        this.setState({
            isInitialLoading: false,
            information: donorInfo,
            donorProposalLists: donorProposalLists,
            donorFinanceProposalists: donorFinanceProposalists
        });
        change(
            'FamilyUnitProposal',
            'donorId',
            donorInfo ? donorInfo.donorId : null
        );
        change(
            'FamilyUnitProposal',
            'name',
            donorInfo ? donorInfo.name : null
        );

        change(
            'FamilyUnitProposal',
            'purpose',
            donorInfo ? purposeList.find(x => x.Name === donorInfo.purpose).id : null
        );
        change(
            'Budget',
            'donorId',
            donorInfo ? donorInfo.donorId : null
        );
        change(
            'Budget',
            'name',
            donorInfo ? donorInfo.name : null
        );

        change(
            'Budget',
            'purpose',
            donorInfo ? purposeList.find(x => x.Name === donorInfo.purpose).id : null
        );


        this.setState({
            centerListState: centerList,
            cityList: CityList
        })
        //this.handleCSISuccess();
    }

    handleCancelBtn = () => {

        sessionStorage.clear();

        this.setState({ isAddProposalEnabled: false },
            () => {
                scroller.scrollTo('donorCard', {
                    delay: 100,
                    duration: 500,
                    smooth: 'easeInOutQuart',
                });
            });
    }

    handleDashboard = () => {
        const { history } = this.props;
        history.push('/donorProfilePage');
    }

    handleEditSuccess = (value, information) => {
        if (information.purpose === "Family Unit Sponsorship") {
            this.handleEditFamilyUnitProposal(value, information);
        } else {

            this.getBudgetProposalById(value, information)
        }
    }

    getBudgetProposalById = (value, information) => {
        const { getBudgetProposalByProposalIdRequest } = this.props;

        const res = new Promise((resolve, reject) =>
            getBudgetProposalByProposalIdRequest(
                {
                    proposalId: information.id
                },
                { reject, resolve }
            )
        );
        res.then(() => this.handleEditOthersProposals(value, information));
        res.catch((error) => {
            notify.show(
                `An error occurred. ${error.response.data.Message}`,
                'error',
                5000
            );
        })

    }

    handleEditFamilyUnitProposal = (value, information) => {
        const { donorInfo, change, donorProposalLists } = this.props;

        this.setState({ propspectId: information.id, proposalisNeedUpdate: true });

        change(
            'FamilyUnitProposal',
            'donorId',
            information ? information.donorProspectId : null
        );
        change(
            'FamilyUnitProposal',
            'name',
            information ? information.donorName : null
        );

        change(
            'FamilyUnitProposal',
            'purpose',
            information ? purposeList.find(x => x.Name === information.purpose).id : null
        );

        change(
            'FamilyUnitProposal',
            'amount',
            information ? information.amount : null
        );
        change(
            'FamilyUnitProposal',
            'fromDate',
            information ? moment(information.periodOfDonationFrom).format('MM/DD/YYYY') : null
        );
        change(
            'FamilyUnitProposal',
            'toDate',
            information ? moment(information.periodofDonationTo).format('MM/DD/YYYY') : null
        );
        change(
            'FamilyUnitProposal',
            'frequency',
            information ? information.frequencyOfNarrativeReport : null
        );
        change(
            'FamilyUnitProposal',
            'Certificate',
            information ? information.frequencyOfUtilizationCertificate : null
        );
        change(
            'FamilyUnitProposal',
            'numberOfUnit',
            information ? information.numberOfUnit : null
        );

        change(
            'FamilyUnitProposal',
            'unit',
            information ? information.numberOfUnit : null
        );
        change(
            'FamilyUnitProposal',
            'location',
            information ? information.locationId : null
        );

        change(
            'FamilyUnitProposal',
            'center',
            information ? information.centerId : null
        );


        this.setState({ isAddProposalEnabled: true, singage: information.singage === true ? true : false, accountInformation: true },
            () => {
                scroller.scrollTo('donorCard', {
                    delay: 100,
                    duration: 500,
                    smooth: 'easeInOutQuart',
                });
            });

    }

    handleEditOthersProposals = (value, information) => {

        const { donorInfo, change, donorProposalLists, budgetProposalInfo } = this.props;

        this.setState({ propspectId: information.id, proposalisNeedUpdate: true });

        change(
            'Budget',
            'donorId',
            information ? information.donorProspectId : null
        );
        change(
            'Budget',
            'name',
            information ? information.donorName : null
        );

        change(
            'Budget',
            'purpose',
            information ? purposeList.find(x => x.Name === information.purpose).id : null
        );

        change(
            'Budget',
            'amount',
            information ? information.amount : null
        );
        change(
            'Budget',
            'fromDate',
            information ? moment(information.periodOfDonationFrom).format('MM/DD/YYYY') : null
        );
        change(
            'Budget',
            'toDate',
            information ? moment(information.periodofDonationTo).format('MM/DD/YYYY') : null
        );
        change(
            'Budget',
            'frequency',
            information ? information.frequencyOfNarrativeReport : null
        );
        change(
            'Budget',
            'Certificate',
            information ? information.frequencyOfUtilizationCertificate : null
        );
        change(
            'Budget',
            'numberOfUnit',
            information ? information.numberOfUnit : null
        );

        change(
            'Budget',
            'unit',
            information ? information.numberOfUnit : null
        );
        change(
            'Budget',
            'location',
            information ? information.locationId : null
        );

        change(
            'Budget',
            'center',
            information ? information.centerId : null
        );

        budgetProposalInfo.listOfBudget.map((item, index) => {
            change(
                'Budget',
                item.activityName, item ? item.activityName === 'Total Budget' ? this.setState({ budgetTotal: parseInt(item.centerAmount) }) : parseInt(item.centerAmount) : null
            );
            var indexx = index + 1;
            sessionStorage.setItem(`index` + indexx + ``, item.centerAmount);
        })


        this.setState({ isAddProposalEnabled: true, singage: information.singage === true ? true : false, accountInformation: true },
            () => {
                scroller.scrollTo('donorCard', {
                    delay: 100,
                    duration: 500,
                    smooth: 'easeInOutQuart',
                });
            });
    }


    handleDeleteConfirm = information => {
        notify.show(
            <div
                aria-hidden="true"
                aria-label="Are you sure you want to delete this Donor Proposal?"
                aria-labelledby="exampleModalLabel"
                aria-modal="true"
                className={styles.alertMsg}
                id="exampleModal"
                role="dialog"
                title="Are you sure you want to delete this Donor Proposal?"
            >
                Are you sure you want to delete this Donor Proposal ?
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
        const { deleteProposalByIdRequest, deleteProposalsByIdRequest, donorInfo } = this.props;
        notify.hide();
     
        if (donorInfo.purpose === "Family Unit Sponsorship") {
            const res1 = new Promise((resolve, reject) =>
                deleteProposalByIdRequest(
                    {
                        "id": information.id
                    },
                    { reject, resolve })
            );
            res1.then(() => this.initialDonorsCalls())
                .catch(error => {
                    if (error.response.status === 400) {
                        notify.show(`${error.response.data.message}`, 'error', 10000);
                    } else {
                        notify.show(` ${error}`, 'error', 5000);
                    }
                });

        } else {
            const res1 = new Promise((resolve, reject) =>
            deleteProposalsByIdRequest(
                    {
                        "id": information.id
                    },
                    { reject, resolve })
            );
            res1.then(() => this.initialDonorsCalls())
                .catch(error => {
                    if (error.response.status === 400) {
                        notify.show(`${error.response.data.message}`, 'error', 10000);
                    } else {
                        notify.show(` ${error}`, 'error', 5000);
                    }
                });

        }



    };

    handleUpdateSubmit = (values) => {

        const { updateProposalFamilyUnitRequest, donorInfo } = this.props;
        const { propspectId } = this.state;
        var purposeLists = purposeList.find(x => x.id === values.purpose).Name;
        var numberOfUnits = units.find(x => x.id === values.unit).name;

        const res = new Promise((resolve, reject) =>
            updateProposalFamilyUnitRequest(
                {
                    "id": parseInt(propspectId),
                    "donorId": parseInt(donorInfo.id),
                    "donorProspectId": values.donorId,
                    "donorName": values.name,
                    "purpose": purposeLists,
                    "locationId": values.location,
                    "centerId": values.center,
                    "numberOfUnit": values.numberOfUnit,
                    "unit": numberOfUnits,
                    "singage": localStorage.getItem('isSignage') === "true" ? true : false,
                    "periodOfDonationFrom": moment(values.fromDate).format("yyyy-MM-DD"),
                    "periodofDonationTo": moment(values.toDate).format("yyyy-MM-DD"),
                    "amount": parseInt(values.amount),
                    "frequencyOfNarrativeReport": values.frequency,
                    "frequencyOfUtilizationCertificate": values.Certificate
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

    handleUpdateProposalSubmit = (values) => {

        const { updateProposalRequest, donorInfo } = this.props;
        const { propspectId, budgetTotal } = this.state;
        var purposeLists = purposeList.find(x => x.id === values.purpose).Name;
        var numberOfUnits = units.find(x => x.id === values.unit).name;


        var listOfBudget = new Array();
        a.map(item => {
            listOfBudget.push(
                {
                    "activityName": item.activityName,
                    "centerAmount": parseInt(item.id === 13 ? budgetTotal : values[item.activityName]),
                    "budgetAmount": parseInt(item.budgetAmount)
                }
            )
        });

        const res = new Promise((resolve, reject) =>
            updateProposalRequest(
                {
                    "id": parseInt(propspectId),
                    "donorId": parseInt(donorInfo.id),
                    "donorProspectId": values.donorId,
                    "donorName": values.name,
                    "purpose": purposeLists,
                    "locationId": values.location,
                    "centerId": values.center,
                    "numberOfUnit": values.numberOfUnit,
                    "unit": numberOfUnits,
                    "periodOfDonationFrom": moment(values.fromDate).format("yyyy-MM-DD"),
                    "periodofDonationTo": moment(values.toDate).format("yyyy-MM-DD"),
                    "amount": parseInt(values.amount),
                    "frequencyOfNarrativeReport": values.frequency,
                    "frequencyOfUtilizationCertificate": values.Certificate,
                    "listOfBudget": listOfBudget
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
        const { donorInfo } = this.props;
        const { proposalisNeedUpdate } = this.state;

        if (donorInfo.purpose === "Family Unit Sponsorship") {
            if (proposalisNeedUpdate === false) {
                this.setState({ isLoading: true });
                this.handleSave(values);
            } else {
                this.handleUpdateSubmit(values);
            }
        } else {
            if (proposalisNeedUpdate === false) {
                this.setState({ isLoading: true });
                this.handleSaveProposals(values);
            } else {
                this.setState({ isLoading: true });
                this.handleUpdateProposalSubmit(values);
            }
        }

    }

    handleSave = (values) => {
        const { saveProposalFamilyUnitRequest, donorInfo } = this.props;
        var purposeLists = purposeList.find(x => x.id === values.purpose).Name;
        var numberOfUnits = units.find(x => x.id === values.unit).name;
        const res = new Promise((resolve, reject) =>
            saveProposalFamilyUnitRequest(
                {

                    "donorId": parseInt(donorInfo.id),
                    "donorProspectId": values.donorId,
                    "donorName": values.name,
                    "purpose": purposeLists,
                    "locationId": values.location,
                    "centerId": values.center,
                    "numberOfUnit": values.numberOfUnit,
                    "unit": numberOfUnits,
                    "singage": localStorage.getItem('isSignage') === "true" ? true : false,
                    "periodOfDonationFrom": moment(values.fromDate).format("yyyy-MM-DD"),
                    "periodofDonationTo": moment(values.toDate).format("yyyy-MM-DD"),
                    "amount": parseInt(values.amount),
                    "frequencyOfNarrativeReport": values.frequency,
                    "frequencyOfUtilizationCertificate": values.Certificate
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

    handleSaveProposals = (values) => {

        const { saveProposalRequest, donorInfo } = this.props;
        const { budgetTotal } = this.state;
        var purposeLists = purposeList.find(x => x.id === values.purpose).Name;
        var numberOfUnits = units.find(x => x.id === values.unit).name;

        var listOfBudget = new Array();
        a.map(item => {
            listOfBudget.push(
                {
                    "activityName": item.activityName,
                    "centerAmount": parseInt(item.id === 13 ? budgetTotal : values[item.activityName]),
                    "budgetAmount": parseInt(item.budgetAmount)
                }
            )
        });


        const res = new Promise((resolve, reject) =>
            saveProposalRequest(
                {

                    "donorId": parseInt(donorInfo.id),
                    "donorProspectId": values.donorId,
                    "donorName": values.name,
                    "purpose": purposeLists,
                    "locationId": values.location,
                    "centerId": values.center,
                    "numberOfUnit": values.numberOfUnit,
                    "unit": numberOfUnits,
                    "singage": localStorage.getItem('isSignage') === "true" ? true : false,
                    "periodOfDonationFrom": moment(values.fromDate).format("yyyy-MM-DD"),
                    "periodofDonationTo": moment(values.toDate).format("yyyy-MM-DD"),
                    "amount": parseInt(values.amount),
                    "frequencyOfNarrativeReport": values.frequency,
                    "frequencyOfUtilizationCertificate": values.Certificate,
                    "listOfBudget": listOfBudget
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

    handleSubmitSuccess = () => {
        this.setState({ isAddProposalEnabled: false, accountInformation: false, isLoading: false, proposalisNeedUpdate: false },
            this.initialDonorsCalls(), () => {
                scroller.scrollTo('donorCard', {
                    delay: 100,
                    duration: 500,
                    smooth: 'easeInOutQuart',
                });
            });
    }

    handleAddProposal = () => {
        const { isAddProposalEnabled } = this.state;
        this.handleInitialLoad();
        this.setState({ isAddProposalEnabled: true, accountInformation: false },
            () => {
                scroller.scrollTo('AddProposal', {
                    delay: 100,
                    duration: 500,
                    smooth: 'easeInOutQuart',
                });
            });
    }

    handleTotal = (amount) => {
        sessionStorage.setItem('amount', parseInt(amount));
        this.setState({ budgetTotal: parseInt(sessionStorage.getItem('amount')) });
    }

    render() {
        const {
            hasErrors,
            isInitialLoading,
            isLoading,
            centerListState,
            isAddProposalEnabled,
            singage,
            donorProposalLists,
            donorFinanceProposalists,
            accountInformation,
            budgetTotal,
        } = this.state;

        const { donorInfo } = this.props;
        const { information } = this.state;

        // gaolLists.sort(function (a, b) { return a.GoalPriority - b.GoalPriority });
        return (
            <div className={styles.container} id="Skip-content">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Proposal</title>
                </Helmet>
                {isInitialLoading ? (
                    <Spinner className={styles.spinner} />
                ) : (
                    <div className={cn(styles.subContainer)} name={'Heading'}>
                        <h1 className={styles.heroText}>Proposal Informations</h1>
                        <div className={styles.heroSubText}>
                            This page allows you to View, Add, and Edit your Proposals.
                        </div>
                        <h2 className={styles.textLight}>Saved Proposals</h2>

                        {donorProposalLists.length === 0 && donorFinanceProposalists.length === 0 ? (
                            <div className={styles.subContainer2}>
                                <div className={styles.heroSubText}>
                                    No Proposal are found. Please create Proposals.
                                </div>
                            </div>
                        ) : (donorInfo.purpose === "Family Unit Sponsorship" ? (<div className={styles.subContainer2} name={'donorCard'}>
                            {donorProposalLists.map((beneficiary, index) => (
                                <SavedProposalCard
                                    key={`SD_${index}`}
                                    handleDeleteSuccess={this.handleDeleteConfirm}
                                    handleEditSuccess={this.handleEditSuccess}
                                    information={beneficiary}
                                    centerList={centerList}
                                    cityList={CityList}
                                />
                            ))}
                        </div>) : (<div className={styles.subContainer2} name={'donorCard'}>
                            {donorFinanceProposalists.map((beneficiary, index) => (
                                <SavedProposalCard
                                    key={`SD_${index}`}
                                    handleDeleteSuccess={this.handleDeleteConfirm}
                                    handleEditSuccess={this.handleEditSuccess}
                                    information={beneficiary}
                                    centerList={centerList}
                                    cityList={CityList}
                                />
                            ))}
                        </div>)
                        )}

                        {/* <div className={styles.scrollOverlayContainer}>
                            <div className={styles.scrollOverlay}>
                                <h5 className={styles.textScroll}>
                                    View More
                                </h5>
                                <div
                                    className={styles.chevron}
                                    onClick={this.handleViewMore}
                                />
                            </div>
                        </div> */}
                        {isAddProposalEnabled === false ? (<div className={styles.addButtinContainer}>
                            <Button
                                className={styles.buttonStyle}
                                onClick={this.handleAddProposal}
                            >
                                Add Proposal
                            </Button>
                        </div>) : (null)}
                        {/* {isAddDonorOrReferred === true ? ( */}
                        <div className={styles.subContainer} name="AddProposal">
                            {((information.purpose === 'Capex' || information.purpose === 'Opex' || information.purpose === 'Corpus' || information.purpose === 'Sustainability') && isAddProposalEnabled === true) ?
                                (
                                    <Budget
                                        cityList={CityList}
                                        purposeList={purposeList}
                                        centerList={centerListState}
                                        roleDecisionMaking={roleDecisionMaking}
                                        onSubmit={this.handleSubmit}
                                        donorId={information.donorId}
                                        donorName={information.name}
                                        handleCSISuccess={() => this.handleCSISuccess()}
                                        handlecenter={(value) => this.handlecenter(value)}
                                        units={units}
                                        numberOfUnit={numberOfUnit}
                                        handleCancelBtn={() => this.handleCancelBtn()}
                                        accountInformation={accountInformation}
                                        loading={isLoading}
                                        budgetTotal={budgetTotal}   //{parseInt(sessionStorage.getItem('amount'))}
                                        handleTotal={(value) => this.handleTotal(value)}
                                    />
                                ) :
                                (isAddProposalEnabled === true ? (<FamilyUnitProposal
                                    cityList={CityList}
                                    roleDecisionMaking={roleDecisionMaking}
                                    purposeList={purposeList}
                                    centerList={centerListState}
                                    onSubmit={this.handleSubmit}
                                    numberOfUnit={numberOfUnit}
                                    donorId={information.donorId}
                                    units={units}
                                    donorName={information.name}
                                    handlecenter={(value) => this.handlecenter(value)}
                                    singage={singage}
                                    loading={isLoading}
                                    handleCancelBtn={() => this.handleCancelBtn()}
                                    accountInformation={accountInformation}
                                />) : (null))
                            }
                        </div>
                    </div>
                )
                }
                <div className={styles.buttonContainer}>
                    <Button
                        className={styles.buttonStyle}
                        onClick={this.handleDashboard}
                    >
                        Go to Donor's Menu
                    </Button>
                </div>
            </div>)
    }
}

DonorProposalPage.propTypes = {
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
    getDonorByIdRequest: PropTypes.func.isRequired,
    isDonorCreated: PropTypes.bool.isRequired,
    saveProposalFamilyUnitRequest: PropTypes.func.isRequired,
    getProposalByDonorIdRequest: PropTypes.func.isRequired,
    getProposalsByDonorIdRequest: PropTypes.func.isRequired,
    saveProposalRequest: PropTypes.func.isRequired,
    updateProposalRequest: PropTypes.func.isRequired,
    deleteProposalsByIdRequest: PropTypes.func.isRequired

};

DonorProposalPage.defaultProps = {
};

const mapStateToProps = state => ({
    donorStakeHolders: state.donor.donorStakeHolders,
    donorInfo: state.donor.donorInfo.data,
    isDonorCreated: state.header.isDonorCreated,
    donorProposalLists: state.donor.donorProposalLists.data,
    donorFinanceProposalists: state.donor.donorFinanceProposalists.data,
    budgetProposalInfo: state.donor.budgetProposalInfo.data
});

const mapDispatchToProps = {
    change,
    reset,
    saveProposalFamilyUnitRequest,
    getDonorByIdRequest,
    getProposalByDonorIdRequest,
    updateProposalFamilyUnitRequest,
    deleteProposalByIdRequest,
    getProposalsByDonorIdRequest,
    saveProposalRequest,
    getBudgetProposalByProposalIdRequest,
    updateProposalRequest,
    deleteProposalsByIdRequest

};

export default connect(mapStateToProps, mapDispatchToProps)(DonorProposalPage);
