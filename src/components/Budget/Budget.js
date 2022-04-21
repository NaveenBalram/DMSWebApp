
import PropTypes from 'prop-types';
import * as styles from './Budget.module.scss';
import { InputText } from "../InputText/InputText";
import { InputDropdown } from '../InputDropdown/InputDropdown';
import Button from "../../components/Button/Button";
import { Form, reduxForm, Field } from "redux-form";
import React, { useState } from 'react';
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import cn from "classnames";
import {
    required,
} from "../../utilities/validations";
import InputWrapper from "../InputWrapper/InputWrapper";
import { InputDate } from "../InputDate/InputDate";
import session from 'redux-persist/lib/storage/session';

const a = [
    {
        id: 0,
        refNo: 1.1,
        activityName: 'PERSONAL PROGRAM',
        budgetAmount: '100,000',

    },
    {
        id: 1,
        refNo: 1.2,
        activityName: 'CENTRE RUNNING',
        budgetAmount: '86,000'
    },
    {
        id: 2,
        refNo: 2.1,
        activityName: 'CAPITAL COST',
        budgetAmount: '200,000'
    },
    {
        id: 3,
        refNo: 3.1,
        activityName: 'HYGIENIC STAY',
        budgetAmount: '60,000'
    },
    {
        id: 4,
        refNo: 3.2,
        activityName: 'NUTRITIOUS FOOD',
        budgetAmount: '40,000'
    },
    {
        id: 5,
        refNo: 3.3,
        activityName: 'TRANSPORTATION',
        budgetAmount: '30,000'
    },
    {
        id: 6,
        refNo: 3.4,
        activityName: 'MEDICAL ASSISTANCE',
        budgetAmount: '50,000'
    },
    {
        id: 7,
        refNo: 3.5,
        activityName: 'EMOTIONAL WELL-BEING',
        budgetAmount: '30,000'
    },
    {
        id: 8,
        refNo: 3.6,
        activityName: 'CELEBRATIONS AND RECREATIONS',
        budgetAmount: '90,000'
    },
    {
        id: 9,
        refNo: 3.7,
        activityName: 'SKILL TRAINING',
        budgetAmount: '40,000'
    },
    {
        id: 10,
        refNo: 3.8,
        activityName: 'EDUCATION ACTIVITIES FOR CHILDREN',
        budgetAmount: '20,000'
    },
    {
        id: 11,
        refNo: 4.1,
        activityName: 'OVERHEAD EXPENSES',
        budgetAmount: '100,000'
    },
    {
        id: 12,
        refNo: 5.1,
        activityName: 'MODEL CENTRES',
        budgetAmount: '115,000'
    },
    {
        id: 13,
        refNo: '',
        activityName: 'Total Budget',
        budgetAmount: '912,000'
    }
];

const Budget = ({
    cityList,
    purposeList,
    centerList,
    roleDecisionMaking,
    handleCSISuccess,
    handleSubmit,
    donorName,
    donorId,
    handlecenter,
    units,
    numberOfUnit,
    loading,
    accountInformation,
    submitting,
    handleCancelBtn,
    handleTotal,
    budgetTotal

}) => {
    
    const textStyle = styles.lightText
    const [roles, setRoles] = useState(0);
    const [isNotSelected, setIsNotSelected] = useState(false);
    const [hideBudget, setHideBudget] = useState(!accountInformation);
    const [amount, setBudget] = useState(0);

    const toggleDisplay = (value) => {
        setIsNotSelected(value);
    };

    const setAmount = [];

    const setAmounts = (event) => {

        if(accountInformation===true){
            setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
            setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
            setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
            setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
            setAmount[4] = (parseInt(sessionStorage.getItem('index5')));
            setAmount[5] = (parseInt(sessionStorage.getItem('index6')));
            setAmount[6] = (parseInt(sessionStorage.getItem('index7')));
            setAmount[7] = (parseInt(sessionStorage.getItem('index8')));
            setAmount[8] = (parseInt(sessionStorage.getItem('index9')));
            setAmount[9] = (parseInt(sessionStorage.getItem('index10')));
            setAmount[10] = (parseInt(sessionStorage.getItem('index11')));
            setAmount[11] = (parseInt(sessionStorage.getItem('index12')));
            setAmount[12] = (parseInt(sessionStorage.getItem('index13')));
        }

        switch (event.target.name) {

           

            case a[0].activityName:

                sessionStorage.setItem('index1', parseInt(event.target.value))
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                break;
            case a[1].activityName:

                sessionStorage.setItem('index2', parseInt(event.target.value))
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));

                break;
            case a[2].activityName:
                sessionStorage.setItem('index3', parseInt(event.target.value))
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                break;
            case a[3].activityName:
                sessionStorage.setItem('index4', parseInt(event.target.value))
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
                break;
            case a[4].activityName:
                sessionStorage.setItem('index5', parseInt(event.target.value))
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
                setAmount[4] = (parseInt(sessionStorage.getItem('index5')));
                break;
            case a[5].activityName:
                sessionStorage.setItem('index6', parseInt(event.target.value));
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
                setAmount[4] = (parseInt(sessionStorage.getItem('index5')));
                setAmount[5] = (parseInt(sessionStorage.getItem('index6')));
                break;
            case a[6].activityName:
                sessionStorage.setItem('index7', parseInt(event.target.value));
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
                setAmount[4] = (parseInt(sessionStorage.getItem('index5')));
                setAmount[5] = (parseInt(sessionStorage.getItem('index6')));
                setAmount[6] = (parseInt(sessionStorage.getItem('index7')));
                break;
            case a[7].activityName:
                sessionStorage.setItem('index8', parseInt(event.target.value));
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
                setAmount[4] = (parseInt(sessionStorage.getItem('index5')));
                setAmount[5] = (parseInt(sessionStorage.getItem('index6')));
                setAmount[6] = (parseInt(sessionStorage.getItem('index7')));
                setAmount[7] = (parseInt(sessionStorage.getItem('index8')));
                break;
            case a[8].activityName:
                sessionStorage.setItem('index9', parseInt(event.target.value))
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
                setAmount[4] = (parseInt(sessionStorage.getItem('index5')));
                setAmount[5] = (parseInt(sessionStorage.getItem('index6')));
                setAmount[6] = (parseInt(sessionStorage.getItem('index7')));
                setAmount[7] = (parseInt(sessionStorage.getItem('index8')));
                setAmount[8] = (parseInt(sessionStorage.getItem('index9')));
                break;
            case a[9].activityName:
                sessionStorage.setItem('index10', parseInt(event.target.value))
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
                setAmount[4] = (parseInt(sessionStorage.getItem('index5')));
                setAmount[5] = (parseInt(sessionStorage.getItem('index6')));
                setAmount[6] = (parseInt(sessionStorage.getItem('index7')));
                setAmount[7] = (parseInt(sessionStorage.getItem('index8')));
                setAmount[8] = (parseInt(sessionStorage.getItem('index9')));
                setAmount[9] = (parseInt(sessionStorage.getItem('index10')));
                break;
            case a[10].activityName:
                sessionStorage.setItem('index11', parseInt(event.target.value));
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
                setAmount[4] = (parseInt(sessionStorage.getItem('index5')));
                setAmount[5] = (parseInt(sessionStorage.getItem('index6')));
                setAmount[6] = (parseInt(sessionStorage.getItem('index7')));
                setAmount[7] = (parseInt(sessionStorage.getItem('index8')));
                setAmount[8] = (parseInt(sessionStorage.getItem('index9')));
                setAmount[9] = (parseInt(sessionStorage.getItem('index10')));
                setAmount[10] = (parseInt(sessionStorage.getItem('index11')));
                break;
            case a[11].activityName:
                sessionStorage.setItem('index12', parseInt(event.target.value));
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
                setAmount[4] = (parseInt(sessionStorage.getItem('index5')));
                setAmount[5] = (parseInt(sessionStorage.getItem('index6')));
                setAmount[6] = (parseInt(sessionStorage.getItem('index7')));
                setAmount[7] = (parseInt(sessionStorage.getItem('index8')));
                setAmount[8] = (parseInt(sessionStorage.getItem('index9')));
                setAmount[9] = (parseInt(sessionStorage.getItem('index10')));
                setAmount[10] = (parseInt(sessionStorage.getItem('index11')));
                setAmount[11] = (parseInt(sessionStorage.getItem('index12')));
                break;
            case a[12].activityName:
                sessionStorage.setItem('index13', parseInt(event.target.value));
                setAmount[0] = (parseInt(sessionStorage.getItem('index1')));
                setAmount[1] = (parseInt(sessionStorage.getItem('index2')));
                setAmount[2] = (parseInt(sessionStorage.getItem('index3')));
                setAmount[3] = (parseInt(sessionStorage.getItem('index4')));
                setAmount[4] = (parseInt(sessionStorage.getItem('index5')));
                setAmount[5] = (parseInt(sessionStorage.getItem('index6')));
                setAmount[6] = (parseInt(sessionStorage.getItem('index7')));
                setAmount[7] = (parseInt(sessionStorage.getItem('index8')));
                setAmount[8] = (parseInt(sessionStorage.getItem('index9')));
                setAmount[9] = (parseInt(sessionStorage.getItem('index10')));
                setAmount[10] = (parseInt(sessionStorage.getItem('index11')));
                setAmount[11] = (parseInt(sessionStorage.getItem('index12')));
                setAmount[12] = (parseInt(sessionStorage.getItem('index13')));
                break;

        }
        var amounts = getSumValue();
        handleTotal(amounts);
    }

    const refresh = () => {
        // re-renders the component
        setIsNotSelected({});
    }


    const hideBudgetToggle = (value) => {
        setHideBudget(value);
    }

    const getSumValue = () => {
        return setAmount.reduce(function (acc, val) { return acc + val; }, 0)

    }
    return (

        <Form
            className={styles.formStyle}
            name="Budget"
            onLoad={handleCSISuccess}
            onSubmit={handleSubmit}
        >

            <h2 className={cn(textStyle, styles.heading)}>Add New Proposal</h2>
            <div className={styles.gap}></div>
            <div>
                <div className={styles.row}>
                    <Field
                        aria-label="Donor/prospect ID"
                        className={styles.customText}
                        component={InputWrapper}
                        label={
                            <p className={styles.label}>
                                First Name<span className={styles.required}>*</span>
                            </p>
                        }
                        name="donorId"
                        placeholder="Donor/prospect ID"
                        validate={[required]}
                    >
                        {InputText}
                    </Field>
                    <Field
                        aria-label="Name"
                        className={styles.customText}
                        component={InputWrapper}
                        label={
                            <p className={styles.label}>
                                First Name<span className={styles.required}>*</span>
                            </p>
                        }
                        name="name"
                        placeholder="Name"
                        validate={[required]}
                    >
                        {InputText}
                    </Field>
                    <Field
                        aria-label="Purpose"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Purpose<span className={styles.required}>*</span>
                            </p>
                        }
                        multi={false}
                        name="purpose"
                        options={purposeList.filter(x => x.id !== 3).map((item) => {
                            return { label: item.Name, value: item.id };
                        })}
                        placeholder="Select Purpose"
                        validate={[required]}
                        isDisabled={false}
                    >
                        {InputDropdown}
                    </Field>
                </div>
                <div className={styles.row}>
                    <Field
                        aria-label="Location"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Location<span className={styles.required}>*</span>
                            </p>
                        }
                        name="location"
                        options={cityList.map((item) => {
                            return { label: item.name, value: item.id };
                        })}
                        placeholder="Select City"
                        validate={[required]}
                        onChange={(value) => handlecenter(value)}
                    >
                        {InputDropdown}
                    </Field>
                    <Field
                        aria-label="Center"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        isSearchable={false}
                        name="center"
                        label={
                            <p className={styles.label}>
                                Center<span className={styles.required}>*</span>
                            </p>
                        }
                        options={centerList.map((item) => {
                            return { label: item.name, value: item.id };
                        })}
                        placeholder="Select Center"
                        validate={[required]}
                    >
                        {InputDropdown}
                    </Field>
                    <Field
                        aria-label="Number Of Unit"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Number of Unit<span className={styles.required}>*</span>
                            </p>
                        }
                        name="numberOfUnit"
                        options={numberOfUnit.map((item) => {
                            return { label: item.name, value: item.id };
                        })}
                        placeholder="Number of Unit"
                        validate={[required]}
                    >
                        {InputDropdown}
                    </Field>
                    <Field
                        aria-label="units"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Unit<span className={styles.required}>*</span>
                            </p>
                        }
                        name="unit"
                        options={units.map((item) => {
                            return { label: item.name, value: item.id };
                        })}
                        placeholder="Select Unit"
                        validate={[required]}
                    >
                        {InputDropdown}
                    </Field>
                </div>
                {hideBudget === false ? (
                    <div>
                        <div className={styles.horizontalBorder}></div>
                        <h2 className={cn(textStyle, styles.heading)}>Add Budget</h2>
                        <div className={styles.gap}></div>
                        <div className={styles.titleBox}>Budget</div>
                        <div className={styles.headerBox}>
                            <div className={styles.refColumn}>Ref No</div>
                            <div className={styles.activityColumn}>Activity Name</div>
                            <div className={styles.centerAmountColumn}>Center Amount(INR)</div>
                            <div className={styles.budgetAmountColumn}>Budget Amount(INR)</div>
                        </div>
                    </div>) : (null)}
                {hideBudget === false ? (
                    a.map(item => (
                        <div className={styles.rowContainerBox}>
                            <div className={styles.refColumn}>{item.refNo}</div>
                            <div className={styles.activityColumn}>{item.activityName}</div>
                            <div className={styles.centerAmountColumn}>
                                <div className={styles.centerAmountTextBoxColumn}>
                                    {item.id !== 13 ? (<Field
                                        aria-label={''}
                                        className={styles.customText}
                                        component={InputWrapper}
                                        name={item.activityName}
                                        placeholder={item.activityName}
                                        validate={[required]}
                                        onChange={(value) => setAmounts(value)}
                                    >
                                        {InputText}
                                    </Field>) : (<div className={styles.budgetAmountRow}>{budgetTotal.toLocaleString('en-IN', {
                                        style: 'currency',
                                        currency: 'INR'
                                    })}</div>)}
                                </div>
                            </div>
                            <div className={styles.budgetAmountRow}>{item.budgetAmount}</div>
                        </div>
                    ))) : (null)
                }
                <div className={styles.gap}></div>
                {hideBudget === false ? (<div>
                    <div className={styles.hideBudget} onClick={(value) => hideBudgetToggle(true)}> hide budget
                        <a className={styles.arrowcontainer}>
                            <div className={styles.arrowline}></div>
                            <div className={styles.arrowline2}></div>
                        </a>
                    </div>
                    <div className={styles.gap}></div>

                </div>) : (
                    <div className={styles.hideBudget} onClick={(value) => hideBudgetToggle(false)}> view budget
                        <a className={styles.arrowcontainer}>
                            <div className={styles.arrowline3}></div>
                            <div className={styles.arrowline4}></div>
                        </a>
                    </div>

                )}


                <h2 className={cn(textStyle, styles.heading)}>Period of donation</h2>
                <div className={styles.row}>
                    <Field
                        aria-label="From Date"
                        className={cn(styles.customText)}
                        component={InputWrapper}
                        dateFormat="mm/dd/yyyy"
                        label={
                            <p className={styles.label}>
                                From<span className={styles.required}>*</span>
                            </p>
                        }
                        name="fromDate"
                        placeholder="MM/DD/YYYY"
                        validate={[required]}
                    >
                        {InputDate}
                    </Field>
                    <Field
                        aria-label="To Date"
                        className={cn(styles.customText)}
                        component={InputWrapper}
                        dateFormat="mm/dd/yyyy"
                        label={
                            <p className={styles.label}>
                                To<span className={styles.required}>*</span>
                            </p>
                        }
                        name="toDate"
                        placeholder="MM/DD/YYYY"
                        validate={[required]}
                    >
                        {InputDate}
                    </Field>
                </div>

                <div className={styles.row}>
                    <Field
                        aria-label="Amount"
                        className={styles.customText}
                        component={InputWrapper}
                        label={
                            <p className={styles.label}>
                                Amount<span className={styles.required}>*</span>
                            </p>
                        }
                        name="amount"
                        placeholder="Amount"
                        validate={[required]}
                    >
                        {InputText}
                    </Field>
                    <Field
                        aria-label="Frequency of the narrative report"
                        className={styles.customText}
                        component={InputWrapper}
                        label={
                            <p className={styles.label}>
                                Frequency of the narrative report<span className={styles.required}>*</span>
                            </p>
                        }
                        name="frequency"
                        placeholder="Frequency of the narrative report"
                        validate={[required]}
                    >
                        {InputText}
                    </Field>
                    <Field
                        aria-label="Frequency of utilization certificate"
                        className={styles.customText}
                        component={InputWrapper}
                        label={
                            <p className={styles.label}>
                                Frequency of utilization certificate<span className={styles.required}>*</span>
                            </p>
                        }
                        name="Certificate"
                        placeholder="Frequency of utilization certificate"
                        validate={[required]}
                    >
                        {InputText}
                    </Field>
                </div>
                <div className={styles.nextButton}>

                    <div
                        className={styles.cancelBtn}
                        onClick={() => handleCancelBtn()}
                        onKeyPress={refresh}
                        role="button"
                        tabIndex="0"
                    >
                        Cancel
                    </div>
                    <Button
                        className={styles.next}
                        disabled={submitting || loading}
                        submitting={submitting || loading}
                        type="submit"
                    >
                        <span>{accountInformation ? "Update Proposal" : "Save Proposal"}</span>
                    </Button>

                </div>
            </div >
        </Form>
    )
}

export default reduxForm({
    form: "Budget",
})(Budget);

//export default Budget;