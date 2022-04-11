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
} from "../../utilities/validations";
import { InputText } from "../InputText/InputText";
import styles from "./StakeHolderInformationForm.module.scss";
import InputWrapper from "../InputWrapper/InputWrapper";
import Button from "../Button/Button";
import InputPassword from "../InputPassword/InputPassword";
import { InputDate } from "../InputDate/InputDate";
import { InputDropdown } from "../InputDropdown/InputDropdown";
import { InputMasked } from "../InputMasked/InputMasked";
import InputCheckbox from '../InputCheckbox/InputCheckbox';


import {
  zipCodeMask,
  phoneNumberMask,
  ssnMask,
  initialMask,
} from "../../utilities/masks";

const StakeHolderInformationForm = ({
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
  handleStakeHolder,
  onSubmitStakeHolder,
  saveStakeHolderInfo
}) => {
  const textStyle = highContrast ? styles.lightText : null;
  const [isExpanded, setIsExpanded] = useState(true);
  const [isNotSelected, setIsNotExpanded] = useState(false);
  const [isShowTC, setIsShowTC] = useState(false);
  const [userName,setUserName] = useState('');
  const [company,setCompany] = useState('');
  const [address,setAddress] = useState('');
  const [designation,setDesignation] = useState('');
  const [dateOfBirth,setDob] = useState('');
  const [mobileNumber,setMobileNumber] = useState('');
  const [emailId,setEmail] = useState('');
  const [roles,setRoles] = useState(0);
  const [releationShip,setReleationShip] = useState('');
  const [salutations,setSalutation] = useState('');
  
  var values = new Object();
  values.dateOfBirth = dateOfBirth;
  values.company = company;
  values.address = address;
  values.designation = designation;
  values.emailId = emailId;
  values.mobileNumber = mobileNumber;
  values.userName = userName;
  values.decisionMaker = localStorage.getItem('isEmailSelected');
  values.setRoles = roles;
  values.releationShip = releationShip;
  values.salutation = salutations;
  sessionStorage.setItem('stakeHolder',JSON.stringify(values));

  const toggleDisplay = (value) => {
    setIsExpanded(value);
    localStorage.setItem('isEmailSelected', value);
    
    setIsNotExpanded(!value);
  };

  const toggleNotSelected = (value) => {
    setIsExpanded(!value);
    localStorage.setItem('isEmailSelected', !value);
    setIsNotExpanded(value);
  };

  const toggleShowTermsConditions = (value) => {
    setIsShowTC(value);
  };
 

  return (
    <Form
      className={styles.formStyle}
      name="StakeHolderInformationForm"
      onLoad={handleCSISuccess}
      onSubmit={handleSubmit}
      type="submit"
    >

      <div className={styles.container}>
        <div className={styles.horizontalBorder} />
        <h2 className={cn(textStyle, styles.heading)}>Stakeholder Details</h2>
        {isIndividualSelected === false ? (<Field
          aria-label="Role in Decision Making"
          className={cn(styles.customText, styles.customDropdown)}
          component={InputWrapper}
          isSearchable={false}
          label={
            <p className={styles.label}>
              Role in Decision Making<span className={styles.required}>*</span>
            </p>
          }
          name="roleName"
          options={roleDecisionMaking.map((item) => {
            return { label: item.name, value: item.id };
          })}
          placeholder="select"
          validate={[required]}
          onChange={(value)=>setRoles(value)}
        >
          {InputDropdown}
        </Field>) : (<Field
          aria-label="releation donor"
          className={styles.customText}
          component={InputWrapper}
          customChildrenWrapper={styles.passwordWrapper}
          label={
            <p className={styles.label}>
              Relation with Donor
              <span className={styles.required}>*</span>
            </p>
          }
          name="releationDonor"
          placeholder="Releation with Donor"
          type="text"
          validate={[required]}
          onChange={(value) => setReleationShip(value.target.value)}
        >
          {InputText}
        </Field>)}
        <h2 className={cn(textStyle, styles.heading)}>Decision Maker</h2>
        <div className={styles.row}>
          <InputCheckbox
            canUncheck
            isSelected={isExpanded}
            label="yes"
            name="emailSelected"
            onValueChange={(value) => toggleDisplay(value)}
          />
          <InputCheckbox
            canUncheck
            isSelected={isNotSelected}
            label="No"
            name="emailNotSelected"
            onValueChange={(value) => toggleNotSelected(value)}
          />
        </div>
        <div className={styles.row}>
        <Field
          aria-label="Saluation"
          className={cn(styles.customText, styles.customDropdown)}
          component={InputWrapper}
          isSearchable={false}
          label={
            <p className={styles.label}>
              Saluation<span className={styles.required}>*</span>
            </p>
          }
          name="saluation"
          options={salutation.map((item) => {
            return { label: item.Name, value: item.id };
          })}
          placeholder="select"
          validate={[required]}
          onChange={(value)=>setSalutation(value)}
        >
          {InputDropdown}
        </Field>
        <Field
          aria-label="Name"
          className={styles.customText}
          component={InputWrapper}
                 label={
            <p className={styles.label}>
              Name<span className={styles.required}>*</span>
            </p>
          }
          name="stakeHolderName"
          placeholder="Name"
          type="text"
          validate={[required]}
          onChange={(value)=>(setUserName(value.target.value))}
        >
          {InputText}
        </Field>
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
          onChange={(value)=>setDob(value.target.value)}
        >
          {InputDate}
        </Field>
        </div>
        
        <div className={styles.row}>
        <Field
          aria-label="phone number"
          className={styles.customText}
          component={InputWrapper}
          label={
            <p className={styles.label}>
              Mobile Number<span className={styles.required}>*</span>
            </p>
          }
         // mask={phoneNumberMask}
          name="mobileNumber"
          placeholder=""
          type="text"
          validate={[required]}
          onChange={(value)=>setMobileNumber(value.target.value)}
        >
          {InputText}
        </Field>
        <Field
          aria-label="Designation"
          className={cn(styles.customText)}
          component={InputWrapper}
          label={
            <p className={styles.label}>
              Designation<span className={styles.required}>*</span>
            </p>
          }
          name="designation"
          placeholder="Designaton"
          validate={[required]}
          onChange={(value)=>setDesignation(value.target.value)}
        >
          {InputText}
        </Field>
        <Field
          aria-label="Company"
          className={cn(styles.customText)}
          component={InputWrapper}
          label={
            <p className={styles.label}>
              Company<span className={styles.required}>*</span>
            </p>
          }
          name="company"
          placeholder="company"
          validate={[required]}
          onChange={(value)=>setCompany(value.target.value)}
        >
          {InputText}
        </Field>
        
        </div>
       
        <Field
          aria-label="email address"
          className={styles.customText}
          component={InputWrapper}
          customChildrenWrapper={styles.passwordWrapper}
          label={
            <p className={styles.label}>
              Email<span className={styles.required}>*</span>
            </p>
          }
          name="email"
          placeholder="example@example.com"
          type="text"
          validate={[required, email]}
          onChange={(value)=>setEmail(value.target.value)}
        >
          {InputText}
        </Field>
        
        <Field
          aria-label="Address"
          className={styles.customText}
          component={InputWrapper}
          label="Address"
          name="address"
          placeholder="Address"
          type="text"
          validate={[required]}
          onChange={(value)=>setAddress(value.target.value)}
        >
          {InputText}
        </Field>
       
       
      </div>
      <div className={styles.nextButton}>
        <Button
          className={styles.next}
          disabled={submitting || loading}
          submitting={submitting || loading}
          //type="submit"
          onClick={(event)=>saveStakeHolderInfo(event)}
        >
          <span>{accountInformation ? "Update" : "Add StakeHolder"}</span>
        </Button>
      </div>
    </Form>
  );
};

StakeHolderInformationForm.propTypes = {
  isIndividualSelected: PropTypes.bool.isRequired,
  handleCSISuccess: PropTypes.func.isRequired,
  handleSubmits: PropTypes.func.isRequired,
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
  handleLoad: PropTypes.func.isRequired
};

export default reduxForm({
  form: "StakeHolderInformationForm",
})(StakeHolderInformationForm);
