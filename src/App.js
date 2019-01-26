import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Map } from 'immutable';
import localstorage from 'store2';

import Loading from './common/components/Loading';
import Header from './common/components/Header';

import Landing from './views/Landing';
import Notebooks from './views/Notebooks';

import { verifyToken, logout } from './redux/actions';

class App extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    loading: PropTypes.bool.isRequired,
    verifyToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, verifyToken } = this.props;

    if (!user) {
      const token = localstorage.get('token');
      if (token) {
        verifyToken(token);
      }
    }
  }

  logout = () => {
    this.props.logout();
  };

  render() {
    const { user, loading } = this.props;

    if (loading) {
      return (
        <div className="app-loading">
          <Loading />
        </div>
      );
    }

    if (!user) {
      return (
        <div className="app">
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <div className="app">
          <Switch>
            <Route exact path="/" component={Notebooks} />
          </Switch>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
