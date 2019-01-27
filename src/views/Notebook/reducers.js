import { combineReducers } from 'redux';
import { fromJS, Map } from 'immutable';

import { GET_NOTEBOOK } from './actions';

const loading = (state = false, action) => {
  switch (action.type) {
    case `${GET_NOTEBOOK}_REQUEST`:
      return true;

    case `${GET_NOTEBOOK}_SUCCESS`:
    case `${GET_NOTEBOOK}_FAILURE`:
      return false;

    default:
      return state;
  }
};

const notebook = (state = Map(), action) => {
  switch (action.type) {
    case `${GET_NOTEBOOK}_SUCCESS`:
      return fromJS(action.json);

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  notebook,
});
