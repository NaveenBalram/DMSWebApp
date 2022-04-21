import React, { Component } from "react";
import styles from "./DonorsDashboardPage.module.scss";
import { Link } from "react-router-dom";
import Button from '../../components/Button/Button';
import { HorizontalMenuList } from "../../components/HorizontalMenuList/HorizontalMenuList";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const items = [
    {
        name: "Donors Profile",
        color: "#527318",
        href: '1'
    },
    {
        name: "TimeLine",
        color: "#527318",
        href: '2'
    },
    {
        name: "Audit Logs",
        color: "#527318",
        href: '3'
    }
];


class DonorsDashboardPage extends Component {
    constructor() {
        super();
        this.state = {
            screen: 'Donors Profile',
        };
    }

    handleScreen = (item) => {
       this.setState({
           screen:item
       });
    }

    handleCreateDonorInformation = ()=>{
      const {history} = this.props;
      history.push('/donorInformationPage');
    }

    handleCreateDonorProposal = ()=>{
      const {history} = this.props;
     if( localStorage.getItem('isDonorCreated')!=='true'){
      history.push('/donorProposalPage');
     }
     
    }

    handleCreateProfile = ()=>{

      const {isDonorCreated} = this.props;
        return(
            <div className={styles.container}>
            <div className={styles.card__container}>
              <div className={styles.card}>
                <div className={styles.card__content}>
                  <h3 className={styles.card__header}>Donor Informations</h3>
                  <p className={styles.card__info}>To Add and update donors information and  their referrals</p>
                  <button className={styles.card__button} onClick={this.handleCreateDonorInformation}>{localStorage.getItem('isDonorCreated')==='true'?'Create Profile':'Update Profile'}</button>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.card__content}>
                  <h3 className={styles.card__header}>Donor Proposals </h3>
                  <p className={styles.card__info}>To add proposal for donors.</p>
                  <button className={localStorage.getItem('isDonorCreated')==='true'?styles.card_disabled:styles.card__button} onClick={this.handleCreateDonorProposal}>Create Proposal</button>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.card__content}>
                  <h3 className={styles.card__header}>Donor Documents</h3>
                  <p className={styles.card__info}>To Donors documents like aadhar card and other informations.</p>
                  <button className={localStorage.getItem('isDonorCreated')==='true'?styles.card_disabled:styles.card__button}>Add Documents</button>
                </div>
              </div>
            </div>
          </div>
        )}

    render() {

        const { screen } = this.state;
      
        return (
            <div className={styles.landingPageContainer}>
                <div className={styles.sectionContainer}>

                    <div className={styles.cardContainer}>
                        <HorizontalMenuList
                            items={items}
                            handleScreen={this.handleScreen}
                        />
                    </div>
                    {screen==='Donors Profile'?this.handleCreateProfile():(screen==='TimeLine'?<p>Time Line</p>:<p>Audit Logs</p>)}
                    
                </div>
            </div>
        );
    }
}
DonorsDashboardPage.propTypes = {
  isDonorCreated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
  setAuthStatus: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
};

DonorsDashboardPage.defaultProps = {};

const mapStateToProps = state => ({
  isDonorCreated:state.header.isDonorCreated
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(DonorsDashboardPage);


