
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

const a = [
    {
        id: 0,
        refNo: 1.1,
        activityName: 'PERSONAL PROGRAM',
        budgetAmount: '100,000'
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
    donorId

}) => {
    const [roles, setRoles] = useState(0);
    const [isNotSelected, setIsNotSelected] = useState(false);
    const toggleDisplay = (value) => {
        setIsNotSelected(value);
    };
    return (

        <Form
        className={styles.formStyle}
        name="Budget"
        onLoad={handleCSISuccess}
        onSubmit={handleSubmit}
      >
        
        <div>
           <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Donr/prospect ID</div>
                <div className={styles.inputTextContainer}>
                    <div className={styles.inputText}>
                        <InputText
                         value={donorId} />
                    </div>
                </div>
            </div>
            <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Name</div>
                <div className={styles.inputTextContainer}>
                    <div className={styles.inputText}>
                        <InputText
                        value={donorName} />
                    </div>
                </div>
            </div>
            <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Purpose</div>
                <div className={styles.inputTextContainer}>
                    <div className={styles.inputDropdown}>
                        <Field
                            aria-label="Purpose"
                            className={cn(styles.customText, styles.customDropdown)}
                            component={InputDropdown}
                            isSearchable={false}
                            multiple={false}
                            name="purpose"
                            options={purposeList.map((item) => {
                                return { label: item.Name, value: item.id };
                            })}
                            placeholder="-- Please Select Purpose --"
                            validate={[required]}
                            //onChange={(value) => setRoles(value)}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Location</div>
                <div className={styles.inputTextContainer}>
                    <div className={styles.inputDropdown}>
                        <Field
                            aria-label="Location"
                            className={cn(styles.customText, styles.customDropdown)}
                            component={InputDropdown}
                            isSearchable={false}
                            name="location"
                            options={roleDecisionMaking.map((item) => {
                                return { label: item.name, value: item.id };
                            })}
                            placeholder="Select City"
                            validate={[required]}
                            onChange={(value) => setRoles(value)}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Centre</div>
                <div className={styles.inputTextContainer}>
                    <div className={styles.inputDropdown}>
                        <Field
                            aria-label="Center"
                            className={cn(styles.customText, styles.customDropdown)}
                            component={InputDropdown}
                            isSearchable={false}
                            name="center"
                            options={roleDecisionMaking.map((item) => {
                                return { label: item.name, value: item.id };
                            })}
                            placeholder="Select Center"
                            validate={[required]}
                            onChange={(value) => setRoles(value)}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Number of Unit</div>
                <div className={styles.inputTextContainer}>
                    <div className={styles.inputDropdown}>
                        <Field
                            aria-label="Number Of Unit"
                            className={cn(styles.customText, styles.customDropdown)}
                            component={InputDropdown}
                            isSearchable={false}
                            name="numberOfUnit"
                            options={roleDecisionMaking.map((item) => {
                                return { label: item.name, value: item.id };
                            })}
                            placeholder="Select Number of Unit"
                            validate={[required]}
                            onChange={(value) => setRoles(value)}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Unit</div>
                <div className={styles.inputTextContainer}>
                    <div className={styles.inputDropdown}>
                        <Field
                            aria-label="Unit"
                            className={cn(styles.customText, styles.customDropdown)}
                            component={InputDropdown}
                            isSearchable={false}
                            name="unit"
                            options={roleDecisionMaking.map((item) => {
                                return { label: item.name, value: item.id };
                            })}
                            placeholder="Select Unit"
                            validate={[required]}
                            onChange={(value) => setRoles(value)}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.titleBox}>Budget</div>
            <div className={styles.headerBox}>
                <div className={styles.refColumn}>Ref No</div>
                <div className={styles.activityColumn}>Activity Name</div>
                <div className={styles.centerAmountColumn}>Center<br />Amount(INR)</div>
                <div className={styles.budgetAmountColumn}>Budget<br />Amount(INR)</div>
            </div>
            {
                a.map(item => (
                    <div className={styles.rowContainerBox}>
                        <div className={styles.refColumn}>{item.refNo}</div>
                        <div className={styles.activityColumn}>{item.activityName}</div>
                        <div className={styles.centerAmountColumn}>
                            <div className={styles.centerAmountTextBoxColumn}>
                                <InputText
                                />
                            </div>
                        </div>
                        <div className={styles.budgetAmountRow}>{item.budgetAmount}</div>
                    </div>
                ))
            }
            <div className={styles.gap}></div>
            <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Period of donation</div>
                <div className={styles.inputDateContainer}>
                    <div>From</div>
                    <div className={styles.inputDate}>
                        <InputText />
                    </div>
                </div>
                <div className={styles.inputDateContainer}>
                    <div>To</div>
                    <div className={styles.inputDate}>
                        <InputText />
                    </div>
                </div>
            </div>
            <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Amount</div>
                <div className={styles.inputTextContainer}>
                    <div className={styles.inputText}>
                        <InputText />
                    </div>
                </div>
            </div>
            <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Frequency of the narrative report</div>
                <div className={styles.inputTextContainer}>
                    <div className={styles.inputText}>
                        <InputText />
                    </div>
                </div>
            </div>
            <div className={styles.bottomRowContainer}>
                <div className={styles.text}>Frequency of utilization certificate</div>
                <div className={styles.inputTextContainer}>
                    <div className={styles.inputText}>
                        <InputText />
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Button className={styles.buttonStyle} onClick={() => null}>Add</Button>
            </div>
        </div >
        </Form>
    )
}

export default reduxForm({
    form: "Budget",
  })(Budget);

//export default Budget;