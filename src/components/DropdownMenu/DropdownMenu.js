import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Dropdown, {
  DropdownContent,
  DropdownTrigger,
} from 'react-simple-dropdown';
import 'react-simple-dropdown/styles/Dropdown.css';
import styles from './DropdownMenu.module.scss';


export default class DropdownMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.dropdown = React.createRef();
  }

  handleClick = () => {
    this.dropdown.current.hide();
  };

  render() {
    const { content, title,isImageRequired, className,contentClassName } = this.props;

    return (
      <Dropdown ref={this.dropdown}>
        <DropdownTrigger className={className}>
          {title}
          {isImageRequired===true?(<div className={styles.arrow}  data-tip="User Profile" />):null}
        </DropdownTrigger>
        <DropdownContent className={contentClassName} onClick={this.handleClick}>{content}</DropdownContent>
      </Dropdown>
    );
  }
}

DropdownMenu.propTypes = {
  className: PropTypes.string,
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
  isImageRequired:PropTypes.bool,
  contentClassName:PropTypes.string
};

DropdownMenu.defaultProps = {
  className: '',
  title: '',
};
