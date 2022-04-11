import React from "react";
import PropTypes from 'prop-types'
import styles from "./StoreWorks.module.scss";

const StoreWorks = (storeWork) => {
    console.log(storeWork);
  return (
    <div className={styles.storeWorksContainer}>
     
        <div className={styles.contentBlock}>
          <ul>
              { storeWork.storeWork.map(
                  (info)=>
               (<li>
                   <div dangerouslySetInnerHTML={{ __html:info.text }} />
               </li>)
              )}
          </ul>
        </div>
    </div>
  )
};

StoreWorks.propTypes = {
    storeWork: PropTypes.arrayOf(PropTypes.shape({})),
    info: PropTypes.shape({
        id:PropTypes.number.isRequired,
        text:PropTypes.string.isRequired,
    }),
}

export default StoreWorks;
