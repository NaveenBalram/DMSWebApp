import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as styles from './FamilyUnitProposal.module.scss';
import { InputText } from "../InputText/InputText";
import Button from "../../components/Button/Button";
import cn from "classnames";
import moment from 'moment';
import { Form, reduxForm, Field } from "redux-form";
import {
    required,
} from "../../utilities/validations";
import { InputDropdown } from "../InputDropdown/InputDropdown";
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import InputWrapper from "../InputWrapper/InputWrapper";
import { InputDate } from "../InputDate/InputDate";

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

const FamilyUnitProposal = ({
    cityList,
    purposeList,
    centerList,
    roleDecisionMaking,
    submitting,
    loading,
    handleCSISuccess,
    handleSubmit,
    donorName,
    donorId,
    handlecenter,
    accountInformation,
    numberOfUnit,
    units,
    handleCancelBtn,
    singage
}) => {

    const textStyle = styles.lightText
    const [roles, setRoles] = useState(0);
    const [isNotSelected, setIsNotSelected] = useState(!singage);
    const toggleDisplay = (value) => {
        setIsNotSelected(value);
        localStorage.setItem('isSignage', isNotSelected);
    };


    const refresh = () => {
        // re-renders the component
        setIsNotSelected({});
    }

    return (
        <Form
            className={styles.formStyle}
            name="FamilyUnitProposal"
            onSubmit={handleSubmit}
        >
            <h2 className={cn(textStyle, styles.heading)}>Add New Proposal</h2>
            <div className={styles.gap}></div>

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
                    options={purposeList.filter(x => x.id == 3).map((item) => {
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
            </div>
            <div className={styles.row}>
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
            <h2 className={cn(textStyle, styles.heading)}>Singage</h2>
            <div className={styles.row}>
                <InputCheckbox
                    canUncheck
                    isSelected={!isNotSelected}
                    label="yes"
                    name="singageSelected"
                    onValueChange={(value) => toggleDisplay(false)}
                />
                <InputCheckbox
                    canUncheck
                    isSelected={isNotSelected}
                    label="No"
                    name="singageNotSelected"
                    onValueChange={(value) => toggleDisplay(true)}
                />
            </div>
            <h2 className={cn(textStyle, styles.heading)}>Period of donation</h2>
            <div className={styles.row}>
                <Field
                    aria-label="From Date"
                    className={cn(styles.customText)}
                    component={InputWrapper}
                    dateFormat="dd/mm/yyyy"
                    label={
                        <p className={styles.label}>
                            From<span className={styles.required}>*</span>
                        </p>
                    }
                    name="fromDate"
                    placeholder="DD/MM/YYYY"
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
        </Form>
    );
};

export default reduxForm({
    form: "FamilyUnitProposal",
})(FamilyUnitProposal);