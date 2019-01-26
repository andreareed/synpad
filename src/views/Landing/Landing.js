import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import localstorage from 'store2';
import classNames from 'classnames';

import Icon from '../../common/components/Icon/Icon';
import Register from './Register';
import Login from './Login';

class Landing extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
  };

  state = {
    view: 'login',
  };

  logout = () => {
    this.props.logout();
    this.setState({ view: 'login' });
  };

  renderView = () => {
    const { view } = this.state;
    const { loginUser, registerUser } = this.props;

    if (view === 'register') {
      return <Register registerUser={registerUser} />;
    }

    return <Login loginUser={loginUser} />;
  };

  render() {
    const { view } = this.state;
    return (
      <div className="landing">
        <div className="container">
          <div className="landing-header">
            <h1>SynPad</h1>
            <Icon icon="Logo" />
            <h3>A Markdown Flavored Note App</h3>
          </div>
          <div className="landing-links">
            <button
              className={classNames({ active: view === 'login' })}
              onClick={() => this.setState({ view: 'login' })}
            >
              Login
            </button>
            <button
              className={classNames({ active: view === 'register' })}
              onClick={() => this.setState({ view: 'register' })}
            >
              Register
            </button>
          </div>
          {this.renderView()}
        </div>
      </div>
    );
  }
}

export default Landing;
