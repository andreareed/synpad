import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import localstorage from 'store2';
import classNames from 'classnames';

import Icon from './common/components/Icon/Icon';
import Register from './views/Register';
import Login from './views/Login';
import Loading from './common/components/Loading';

import { verifyToken, logout } from './redux/actions';

class App extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    loading: PropTypes.bool.isRequired,
    verifyToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    view: 'login',
  };

  componentDidMount() {
    const { user, verifyToken } = this.props;
    if (!user) {
      const token = localstorage.get('token');
      if (token) {
        verifyToken(token).then(action => {
          if (action.response.ok) {
            this.setState({ view: 'success' });
          }
        });
      }
    }
  }

  logout = () => {
    this.props.logout();
    this.setState({ view: 'login' });
  };

  renderView = () => {
    const { view } = this.state;
    const { user, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (view === 'register') {
      return <Register onSuccess={() => this.setState({ view: 'success' })} />;
    }

    if (view === 'success') {
      if (!user) {
        return (
          <div className="app-success">
            <h3>Logged Out</h3>
          </div>
        );
      }
      return (
        <div className="app-success">
          <div>
            <h3>
              {user.get('first_name')} {user.get('last_name')}
            </h3>
            {user.get('email')}
            <small>User ID {user.get('id')}</small>
            <button className="btn" onClick={this.logout}>
              Logout
            </button>
          </div>
        </div>
      );
    }

    return <Login onSuccess={() => this.setState({ view: 'success' })} />;
  };

  render() {
    const { view } = this.state;
    return (
      <div className="app">
        <div className="container">
          <div className="app-header">
            <h1>SynPad</h1>
            <Icon icon="Logo" />
            <h3>A Markdown Flavored Note App</h3>
          </div>
          <div className="app-links">
            <button
              className={classNames({ active: view === 'register' })}
              onClick={() => this.setState({ view: 'register' })}
            >
              Register
            </button>
            <button
              className={classNames({ active: view === 'login' })}
              onClick={() => this.setState({ view: 'login' })}
            >
              Login
            </button>
          </div>
          {this.renderView()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyToken: token => dispatch(verifyToken(token)),
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
