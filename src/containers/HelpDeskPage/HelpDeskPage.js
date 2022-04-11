import cn from 'classnames';
import React, { Component } from 'react';
import {
  accessCodeIncrement
} from '../../actions/Auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './HelpDeskPage.module.scss';

class HelpDeskPage extends Component {

  componentDidMount() {

    const {accessCodeIncrement} = this.props;
    accessCodeIncrement({accessCodeCounter:0})
  }

  render() {
    return (
      <div className={cn(styles.container)}>
          <div className={styles.overlayBlock}>
            <h1>Access code Not Found</h1>
            <p>Please contact your Aflac benefits representative or employer to obtain your access code</p>
          </div>
      </div>
    );
  }
}

HelpDeskPage.propTypes = {
  accessCodeIncrement: PropTypes.func.isRequired,
  accessCodeCounter: PropTypes.number.isRequired,
};
HelpDeskPage.defaultProps = {};

const mapStateToProps = state => ({
  accessCodeCounter: state.auth.accessCodeCounter,
});

const mapDispatchToProps = {
  accessCodeIncrement
};

export default connect (mapStateToProps, mapDispatchToProps) (HelpDeskPage);





