import React, { Component } from "react";
import styles from "./LandingPage.module.scss";
import PropTypes from "prop-types";
//import Button from '../../components/Button/Button'
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = { viewLegal: true,isloaded:false };
  }

  componentDidMount(){
   const {history} = this.props;
  

  }

  render() {
    const { viewLegal } = this.state;
    return (
      <div className={styles.landingPageContainer}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard</title>
        </Helmet>
      </div>
    );
  }
}
LandingPage.propTypes = {
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
};

export default LandingPage;
