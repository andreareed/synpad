import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

class Modal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    isVisible: false,
    onClose: () => {},
  };

  componentDidMount() {
    if (this.props.isVisible) {
      this.setBodyOverflow(true);
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.isVisible && nextProps.isVisible) {
      this.setBodyOverflow(true);
    } else if (this.props.isVisible && !nextProps.isVisible) {
      this.setBodyOverflow(false);
    }
  }

  componentWillUnmount() {
    this.setBodyOverflow(false);
  }

  setBodyOverflow(isVisible) {
    if (isVisible) {
      document.body.classList.add('body-lock');
    } else {
      document.body.classList.remove('body-lock');
    }
  }

  render() {
    const modalClasses = {
      modal: true,
      'modal--visible': this.props.isVisible,
      [`${this.props.className}`]: this.props.className,
    };

    return (
      <div className={classNames(modalClasses)}>
        <div className="modal__children">{this.props.children}</div>
        <button className="modal__overlay" onClick={this.props.onClose} />
      </div>
    );
  }
}

export default Modal;
