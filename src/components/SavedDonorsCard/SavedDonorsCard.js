/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SavedDonorsCard.module.scss';
import edit from '../../assets/img/edit-white.png';
import deleteImg from '../../assets/img/delete-white.svg';

export const SavedDonorsCard = ({
  handleEditSuccess,
  handleDeleteSuccess,
  information,
  saveDependentForm,
  type,
}) => {


  return (
    <div className={styles.container}>
      {information.Id === 0 ? null : (
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
      <div className={styles.productName}>{information.name}</div>
     {information.decisionMakingRole!=="Nothing"?(<div className={styles.productTagLine}>
        Role : {information.decisionMakingRole}
      </div>):(<div className={styles.productTagLine}>
        Donor Releation : {information.donorRelationShip}
      </div>)}
      <div className={styles.productTagLine}>
        Designation : {information.designation}
      </div>
      <div className={styles.productTagLine}>
        Company : {information.company}
      </div>
      <div className={styles.productTagLine}>
        Mobile : {information.mobileNo}
      </div>
      <div className={styles.productTagLine}>
        Decision Maker : {information.decisionMaker===true?'Yes':'No'}
      </div>
    </div>
  );
};

SavedDonorsCard.propTypes = {
  handleDeleteSuccess: PropTypes.func.isRequired,
  handleEditSuccess: PropTypes.func.isRequired,
  saveDependentForm: PropTypes.array,
  type: PropTypes.oneOf(['Dependents', 'Beneficiary']).isRequired,
};
