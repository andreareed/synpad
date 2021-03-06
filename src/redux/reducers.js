import { combineReducers } from 'redux';
import { fromJS } from 'immutable';
import localstorage from 'store2';

import notebooks from '../views/Notebooks/reducers';
import notebook from '../views/Notebook/reducers';
import { REGISTER_USER, LOGIN_USER, VERIFY_TOKEN, LOGOUT_USER, UPDATE_USER } from './actions';

const loading = (state = false, action) => {
  switch (action.type) {
    case `${VERIFY_TOKEN}_REQUEST`:
      return true;

    case `${VERIFY_TOKEN}_SUCCESS`:
    case `${VERIFY_TOKEN}_FAILURE`:
      return false;

    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch (action.type) {
    case `${REGISTER_USER}_SUCCESS`:
      localstorage.set('token', action.json.token);
      return fromJS(action.json);

    case `${LOGIN_USER}_SUCCESS`:
      localstorage.set('token', action.json.token);
      return fromJS(action.json);

    case `${VERIFY_TOKEN}_SUCCESS`:
      localstorage.set('token', action.json.token);
      return fromJS(action.json);

    case LOGOUT_USER:
      localstorage.clear();
      return null;

    case `${UPDATE_USER}_SUCCESS`:
      return fromJS(action.json);

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  user,
  notebooks,
  notebook,
});
