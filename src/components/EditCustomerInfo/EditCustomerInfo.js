import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { Form, reduxForm, Field } from "redux-form";
import {
  required,
  email,
  repeatEmail,
  beforeNowDaysMMDDYYYY,
  phoneNumber,
  ssn,
} from "../../utilities/validations";
import { InputText } from "../InputText/InputText";
import styles from "./EditCustomerInfo.module.scss";
import InputWrapper from "../InputWrapper/InputWrapper";
import Button from "../Button/Button";
import { InputDate } from "../InputDate/InputDate";
import { InputDropdown } from "../InputDropdown/InputDropdown";
import { InputMasked } from "../InputMasked/InputMasked";
import {
  zipCodeMask,
  phoneNumberMask,
  ssnMask,
  initialMask,
} from "../../utilities/masks";

const EditCustomerInfo = ({
  handleSubmit,
  submitting,
  loading,
  highContrast,
  genderTypes,
  phoneTypes,
  states,
}) => {
  const textStyle = highContrast ? styles.lightText : null;

  return (
    <Form
      className={styles.formStyle}
      name="editCustomerInfo"
      onSubmit={handleSubmit}
    >
      <h2 className={cn(textStyle, styles.positioningClass)}>
        <span className={styles.required}>*</span> Denotes a Required Field
      </h2>
      <div className={styles.container}>
        <h2 className={cn(textStyle, styles.heading)}>Access Code Details</h2>
        <p className={styles.accessLabel}>
          If you do not know your access code, contact your Aflac benefits
          representative or employer.
        </p>
        <Field
          aria-label="access code"
          className={styles.customText}
          component={InputWrapper}
          label={
            <p className={styles.label}>
              Enter your access code here.
              <span className={styles.required}>*</span>
            </p>
          }
          name="accesscode"
          placeholder="12345ABCD"
          validate={[required]}
        >
          {InputText}
        </Field>
        <h2 className={cn(textStyle, styles.heading)}>Personal Details</h2>
        <div className={styles.row}>
          <Field
            aria-label="first name"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                First Name<span className={styles.required}>*</span>
              </p>
            }
            name="firstName"
            placeholder="Tom"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="middle name"
            className={cn(styles.customText, styles.initial)}
            component={InputWrapper}
            label="Initial (Optional)"
            mask={initialMask}
            name="middleName"
            placeholder="D"
          >
            {InputMasked}
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
        </div>
        <div className={styles.row}>
          <Field
            aria-label="date of birth"
            className={cn(styles.customText)}
            component={InputWrapper}
            dateFormat="mm/dd/yyyy"
            label={
              <p className={styles.label}>
                Date Of Birth<span className={styles.required}>*</span>
              </p>
            }
            name="dateOfBirth"
            placeholder="MM/DD/YYYY"
            validate={[required, beforeNowDaysMMDDYYYY]}
          >
            {InputDate}
          </Field>
          <Field
            aria-label="gender"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Gender<span className={styles.required}>*</span>
              </p>
            }
            multi={false}
            name="gender"
            options={genderTypes.map((item) => {
              return { label: item.name, value: item.id };
            })}
            placeholder="Select Your Gender"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="social security number"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Social Security Number<span className={styles.required}>*</span>
              </p>
            }
            mask={ssnMask}
            name="ssn"
            placeholder="123-45-6789"
            validate={[required, ssn]}
          >
            {InputMasked}
          </Field>
        </div>
        <div className={styles.horizontalBorder} />
        <h2 className={cn(textStyle, styles.heading)}>Address Details</h2>
        <Field
          aria-label="Address Line 1"
          className={cn(styles.customText)}
          component={InputWrapper}
          label={
            <p className={styles.label}>
              Address Line 1<span className={styles.required}>*</span>
            </p>
          }
          name="addressLine1"
          placeholder="House No, Street Name,"
          validate={[required]}
        >
          {InputText}
        </Field>
        <Field
          aria-label="Address Line 2"
          className={cn(styles.customText)}
          component={InputWrapper}
          label="Address Line 2 (Optional)"
          name="addressLine2"
          placeholder="Locality, Landmark,"
        >
          {InputText}
        </Field>
        <div className={styles.row}>
          <Field
            aria-label="city"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                City<span className={styles.required}>*</span>
              </p>
            }
            name="city"
            placeholder="City"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="state"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                State<span className={styles.required}>*</span>
              </p>
            }
            name="state"
            options={states.map((item) => {
              return { label: item.name, value: item.abbreviation };
            })}
            placeholder="State"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="zipcode"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Zip Code<span className={styles.required}>*</span>
              </p>
            }
            mask={zipCodeMask}
            name="zipcode"
            placeholder="Zip Code"
            validate={[required]}
          >
            {InputMasked}
          </Field>
        </div>
        <div className={styles.row}>
          <Field
            aria-label="phone number"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Phone Number<span className={styles.required}>*</span>
              </p>
            }
            mask={phoneNumberMask}
            name="phoneNumber"
            placeholder="(123) 456-7890"
            validate={[required, phoneNumber]}
          >
            {InputMasked}
          </Field>
          <Field
            aria-label="phone type"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Phone Type<span className={styles.required}>*</span>
              </p>
            }
            name="phoneType"
            options={phoneTypes.map((item) => {
              return { label: item.phoneTypeName, value: item.id };
            })}
            placeholder="Phone Type"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
        </div>
        <div className={styles.row}>
          <Field
            aria-label="alternate phone number"
            className={styles.customText}
            component={InputWrapper}
            label="Alternate Phone (Optional)"
            mask={phoneNumberMask}
            name="alternatePhoneNumber"
            placeholder="(123) 456-7890"
            validate={[phoneNumber]}
          >
            {InputMasked}
          </Field>
          <Field
            aria-label="alternate phone type"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label="Alternate Phone Type (Optional)"
            name="alternatePhoneType"
            options={phoneTypes.map((item) => {
              return { label: item.phoneTypeName, value: item.id };
            })}
            placeholder="Phone Type"
          >
            {InputDropdown}
          </Field>
        </div>
        <div className={styles.horizontalBorder} />
        <h2 className={cn(textStyle, styles.heading)}>Login Details</h2>
        <div className={styles.row}>
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
            placeholder="example@empowered.com"
            validate={[required, email]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="confirm email address"
            className={styles.customText}
            component={InputWrapper}
            customChildrenWrapper={styles.passwordWrapper}
            label={
              <p className={styles.label}>
                Confirm Email Address<span className={styles.required}>*</span>
              </p>
            }
            name="reEnterEmail"
            placeholder="example@empowered.com"
            validate={[required, email, repeatEmail]}
          >
            {InputText}
          </Field>
        </div>
      </div>
      <div className={styles.nextButton}>
        <Button
          className={styles.next}
          disabled={submitting || loading}
          submitting={submitting || loading}
          type="submit"
        >
          Update
        </Button>
      </div>
    </Form>
  );
};

EditCustomerInfo.propTypes = {
  customerDetails: PropTypes.shape({
    EmailOptIn: PropTypes.bool,
  }).isRequired,
  genderTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleCSISuccess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  phoneTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  states: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: "editCustomerInfo",
})(EditCustomerInfo);
