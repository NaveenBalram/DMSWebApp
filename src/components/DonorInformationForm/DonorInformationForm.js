import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { Form, reduxForm, Field } from "redux-form";
import {
  required,
  email,
  repeatPassword,
  repeatEmail,
  beforeNowDaysMMDDYYYY,
  phoneNumber,
  specialCharecterRequired,
  hasNumber,
  ssn,
  minLength8,
  checkUpperAndLowerCase,
  afterDateDaysMMDDYYYY,
} from "../../utilities/validations";
import { InputText } from "../InputText/InputText";
import styles from "./DonorInformationForm.module.scss";
import InputWrapper from "../InputWrapper/InputWrapper";
import Button from "../Button/Button";
import InputPassword from "../InputPassword/InputPassword";
import { InputDate } from "../InputDate/InputDate";
import { InputDropdown } from "../InputDropdown/InputDropdown";
import { InputMasked } from "../InputMasked/InputMasked";
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import StakeHolderInformationForm from '../StakeHolderInformationForm/StakeHolderInformationForm';

import {
  zipCodeMask,
  phoneNumberMask,
  ssnMask,
  initialMask,
} from "../../utilities/masks";

const DonorInformationForm = ({
  // getBrokerInfo,
  handleCSISuccess,
  handleSubmit,
  accountInformation,
  submitting,
  loading,
  highContrast,
  donationTypes,
  donorCategories,
  sourceOfPayment,
  cityList,
  purposeList,
  centerList,
  salutation,
  roleDecisionMaking,
  handleLoad,
  isIndividualSelected,
  saveStakeHolderInfo,
  handlecenter
}) => {
  const textStyle = highContrast ? styles.lightText : null;

  return (
    <Form
      className={styles.formStyle}
      name="donorInformation"
      onLoad={handleCSISuccess}
      onSubmit={handleSubmit}
    >
      <h2 className={cn(styles.lightText, styles.positioningClass)}>
        <span className={styles.required}>*</span>{" "}
        <span className={styles.requiredSmall}>Denotes a Required Field</span>
      </h2>

      <div className={styles.container}>
        <h2 className={cn(textStyle, styles.heading)}>Donor Informations</h2>
        <div className={styles.row}>
          <Field
            aria-label="donationTypes"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Donation Type<span className={styles.required}>*</span>
              </p>
            }
            name="donationType"
            options={donationTypes.map((item) => {
              return { label: item.Name, value: item.Id };
            })}
            placeholder="Donation type"
            validate={[required]}
            onChange={(value) => handleLoad(value)}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="donor Name"
            className={cn(styles.customText)}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Donor Name<span className={styles.required}>*</span>
              </p>
            }
            name="donorName"
            placeholder="Donor Name"
            validate={[required]}
          >
            {InputText}
          </Field>
        </div>
        <div className={styles.row}>
          <Field
            aria-label="Pan card"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Pan Card<span className={styles.required}>*</span>
              </p>
            }
            name="pancard"
            placeholder="ASRPB****"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="donorCategory"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Donation Category<span className={styles.required}>*</span>
              </p>
            }
            name="donationCategory"
            options={donorCategories.map((item) => {
              return { label: item.name, value: item.id };
            })}
            placeholder="Donation Category"
            validate={[required]}

          >
            {InputDropdown}
          </Field>
        </div>

       {accountInformation===false?( 
      <div>
       <div className={styles.horizontalBorder} />
        <StakeHolderInformationForm
          salutation={salutation}
          roleDecisionMaking={roleDecisionMaking}
          isIndividualSelected={isIndividualSelected}
          onSubmit={handleSubmit}
          saveStakeHolderInfo={(event) => saveStakeHolderInfo(event)}
        />
        </div>):null}
        <div className={styles.horizontalBorder} />
        <h2 className={cn(textStyle, styles.heading)}>Payment Information</h2>
        <div className={styles.row}>
          <Field
            aria-label="donor Name"
            className={cn(styles.customText)}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Donor Referred by<span className={styles.required}>*</span>
              </p>
            }
            name="donorReffered"
            placeholder="Donor Reffered By"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="Relationship manager(TM/CEO/SM)"
            className={cn(styles.customText)}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Relationship manager(TM/CEO/SM)<span className={styles.required}>*</span>
              </p>
            }
            name="releationShipManager"
            placeholder="Relationship manager"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="Sourceofpayment"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Source of payment<span className={styles.required}>*</span>
              </p>
            }
            name="sourceofpayment"
            options={sourceOfPayment.map((item) => {
              return { label: item.Name, value: item.Id };
            })}
            placeholder="Source of payment"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
        </div>
        <div className={styles.row}>

          <Field
            aria-label="purpose"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Purpose<span className={styles.required}>*</span>
              </p>
            }
            name="purpose"
            options={purposeList.map((item) => {
              return { label: item.Name, value: item.id };
            })}
            placeholder="Purpose"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="donorPreferredLocation"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
             Donor Preferred Location<span className={styles.required}>*</span>
              </p>
            }
            name="donorPreferredLocation"
            options={cityList.map((item) => {
              return { label: item.name, value: item.id };
            })}
            placeholder="Donor Location"
            validate={[required]}
            onChange={(value)=>handlecenter(value)}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="centre"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
            Centre<span className={styles.required}>*</span>
              </p>
            }
            name="center"
            options={centerList.map((item) => {
              return { label: item.name, value: item.id };
            })}
            placeholder="Center"
            validate={[required]}

          >
            {InputDropdown}
          </Field>

        </div>
        <Field
            aria-label="Comment/Remarks"
            className={cn(styles.customText)}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Comment/Remarks<span className={styles.required}>*</span>
              </p>
            }
            name="commentsRemarks"
            placeholder="Comment/Remarks"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
          aria-label="Next Follow-up Date"
          className={cn(styles.customText)}
          component={InputWrapper}
          dateFormat="mm/dd/yyyy"
          label={
            <p className={styles.label}>
              Next Follow-up Date<span className={styles.required}>*</span>
            </p>
          }
          name="followUpDate"
          placeholder="MM/DD/YYYY"
          validate={[required]}
        >
          {InputDate}
        </Field>
      </div>
      <div className={styles.nextButton}>
        <Button
          className={styles.next}
          disabled={submitting || loading}
          submitting={submitting || loading}
          type="submit"

        >
          <span>{accountInformation ? "Update" : "Submit"}</span>
        </Button>
      </div>
    </Form>
  );
};

DonorInformationForm.propTypes = {
  isIndividualSelected: PropTypes.bool.isRequired,
  handleCSISuccess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  donationTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  donorCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sourceOfPayment: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  cityList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  purposeList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  centerList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  salutation: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  roleDecisionMaking: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitting: PropTypes.bool.isRequired,
  handleLoad: PropTypes.func.isRequired,
  saveStakeHolderInfo: PropTypes.func.isRequired
};

export default reduxForm({
  form: "donorInformation",
})(DonorInformationForm);
