import cn from "classnames";
import React, { Component } from "react";
import styles from "./ContactUsPage.module.scss";
import { Link } from "react-router-dom";
class ContactUsPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className={cn(styles.container)}>
        <div className={styles.overlayBlock}>
          <h1 className={styles.bannerHeading}>Contact Us</h1>
          <h2 className={styles.bannerHeading}>We are here to help you.</h2>
          <p className={styles.bannerContent}>
            If you are an Aflac policyholder, certificate holder or employee of
            an account that offers Aflac, please contact your Aflac agent for
            questions.
          </p>
          <div className={styles.linkFlex}>
            <p className={styles.signUpItem}  aria-label="To find an agent near you">
            To find an agent near you? &nbsp;
            <a        href="https://www.aflac.com/agent-locator/default.aspx"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                    Click Here
                    </a>
            </p>
            <p className={styles.signUpItem}  arial-label="To learn more about Aflac">
            To learn more about Aflac  &nbsp;
            <a        href="https://www.aflac.com/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                    Click Here
                    </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}


ContactUsPage.defaultProps = {};


export default ContactUsPage;
