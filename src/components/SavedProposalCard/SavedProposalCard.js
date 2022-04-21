/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SavedProposalCard.module.scss';
import edit from '../../assets/img/edit-white.png';
import deleteImg from '../../assets/img/delete-white.svg';
import moment from 'moment';
import NumberFormat from 'react-number-format';

export const SavedProposalCard = ({
    handleEditSuccess,
    handleDeleteSuccess,
    information,
    saveDependentForm,
    type,
}) => {
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
    const cityName = CityList.find(x => x.id === information.locationId).name;
    const centreName = centerList.find(x => x.id === information.centerId).name;
    return (
        <div className={styles.container}>
            {information.id === 0 ? null : (
                <div className={styles.assignDependents}>
                    <div className={styles.imgIcons}>
                        <input
                            alt="edit"
                            className={styles.actionLogo}
                            onClick={value => handleEditSuccess(value, information)}
                            onKeyPress={() => handleEditSuccess()}
                            src={edit}
                            type="image"
                        />

                        <input
                            alt="delete"
                            className={styles.actionLogo}
                            onClick={() => handleDeleteSuccess(information)}
                            onKeyPress={() => handleDeleteSuccess(information)}
                            src={deleteImg}
                            type="image"
                        />

                    </div>
                </div>
            )}
            <div className={styles.productName}>{information.donorName}</div>
            <div className={styles.gap}></div>

            <div className={styles.productName}>
                <NumberFormat
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                    prefix={'₹'}
                    displayType={'text'}
                    value={information.amount} />
            </div>
            <div className={styles.flexContainer}>
                <div className={styles.productTagLine}>
                    {cityName}
                </div>
                <div className={styles.productTagLine}>
                    {centreName}
                </div>
                <div className={styles.productTagLine}>
                    singage :{information.singage === true ? 'Yes' : 'No'}
                </div>
            </div>
            <div className={styles.gap}></div>
            <div className={styles.flexContainer}>
                <div className={styles.productTagLine}>
                    Duration
                </div>
                <div className={styles.productTagLine}>
                    From : {moment(information.periodOfDonationFrom).format('DD/MM/YYYY')}
                </div>
                <div className={styles.productTagLine}>
                    To :{moment(information.periodofDonationTo).format('DD/MM/YYYY')}
                </div>
            </div>
            <div className={styles.gap}></div>

        </div>
    );
};

SavedProposalCard.propTypes = {
    handleDeleteSuccess: PropTypes.func.isRequired,
    handleEditSuccess: PropTypes.func.isRequired,
    saveDependentForm: PropTypes.array,
    type: PropTypes.oneOf(['Dependents', 'Beneficiary']).isRequired,
};
