import React, { useState } from "react";
import PropTypes, { number } from "prop-types";
import cn from "classnames";
import { Form, reduxForm, Field } from "redux-form";
import {
  required,
  email,
  validateNumbers
} from "../../utilities/validations";
import { InputText } from "../InputText/InputText";
//import InputCheckbox from '../InputCheckbox/InputCheckbox';
import styles from "./SignUpForm.module.scss";
import InputWrapper from "../InputWrapper/InputWrapper";
import Button from "../Button/Button";
import InputPassword from "../InputPassword/InputPassword";
import { InputDate } from "../InputDate/InputDate";
import { InputDropdown } from "../InputDropdown/InputDropdown";
import { InputMasked } from "../InputMasked/InputMasked";
//import LayoutTermsAndConditions from '../LayoutTermsAndConditions/LayoutTermsAndConditions';

import {
  zipCodeMask,
  phoneNumberMask,
  ssnMask,
  initialMask,
} from "../../utilities/masks";

const SignUpForm = ({
  // getBrokerInfo,
  handleCSISuccess,
  handleSubmit,
  accountInformation,
  submitting,
  loading,
  highContrast,
  donationTypes
}) => {
  const textStyle = highContrast ? styles.lightText : null;

  return (
    <Form
      className={styles.formStyle}
      name="signUp"
      onLoad={handleCSISuccess}
      onSubmit={handleSubmit}
    >
      <h2 className={cn(styles.lightText, styles.positioningClass)}>
        <span className={styles.required}>*</span>{" "}
        <span className={styles.requiredSmall}>Denotes a Required Field</span>
      </h2>

      <div className={styles.container}>
        <h2 className={cn(textStyle, styles.heading)}>Donaor Details</h2>
        
          <Field
            aria-label="first name"
            className={cn(styles.customText)}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                First Name<span className={styles.required}>*</span>
              </p>
            }
            name="firstName"
            placeholder="First Name"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="last name"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Last Name<span className={styles.required}>*</span>
              </p>
            }
            name="lastName"
            placeholder="Smith"
            validate={[required]}
          >
            {InputText}
          </Field>
        <Field
            aria-label="phone number"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Phone Number<span className={styles.required}>*</span>
              </p>
            }
            type="text"
            name="phoneNumber"
            placeholder="Mobile Number"
            validate={[required]}
          >
             {InputText}
          </Field>
          <Field
            aria-label="email address"
            className={styles.customText}
            component={InputWrapper}
            customChildrenWrapper={styles.passwordWrapper}
            label={
              <p className={styles.label}>
                Email Address<span className={styles.required}>*</span>
              </p>
            }
            name="email"
            placeholder="example@example.com"
            type="text"
            validate={[required, email]}
          >
            {InputText}
          </Field>
        {/* <div className={styles.horizontalBorder} />
        <h2 className={cn(textStyle, styles.heading)}>Address Details</h2> */}
        <Field
          aria-label="Address"
          className={cn(styles.customText)}
          component={InputWrapper}
          label={
            <p className={styles.label}>
              Address<span className={styles.required}>*</span>
            </p>
          }
          name="addressLine1"
          type="text"
          placeholder="House No, Street Name,"
          validate={[required]}
        >
          {InputText}
        </Field>
        <Field
            aria-label="donationTypes"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Donation Recieved<span className={styles.required}>*</span>
              </p>
            }
            name="donationRecieved"
            options={donationTypes.map((item) => {
              return { label: item.name, value: item.id };
            })}
            placeholder="Donation Type"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="Quantity"
            className={styles.customText}
            component={InputWrapper}
            label="Quantity"
            name="quantity"
            placeholder="Quantity"
            type="text"
            validate={[required,validateNumbers]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="description"
            className={styles.customText}
            component={InputWrapper}
            label="Description"
            name="description"
            placeholder="description"
            type="text"
            validate={[required]}
          >
               {InputText}
          </Field>
          <div className={styles.row}>

          </div>
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

SignUpForm.propTypes = {
  accountInformation: PropTypes.bool.isRequired,
 
  handleCSISuccess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  donationTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: "signUp",
})(SignUpForm);
