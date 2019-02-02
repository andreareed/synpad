import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavLink, Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { logout } from '../../redux/actions';

import Icon from './Icon/Icon';

class Header extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map).isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { user, logout, location } = this.props;

    return (
      <div className="header">
        <div className="header-brand">
          <NavLink exact to="/">
            <Icon icon="Logo" /> SynPad
          </NavLink>
        </div>
        <div className="header-nav-links">
          <div className="header-nav-links__dropdown">
            <span className={classNames({ active: location.pathname === '/account' })}>{user.get('first_name')}</span>
            <div className="header-nav-links__dropdown-box">
              <Link to="/account">Account</Link>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
