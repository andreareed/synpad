import { combineReducers } from 'redux';
import { fromJS, List } from 'immutable';

import { GET_NOTEBOOKS, POST_NOTEBOOK } from './actions';
import { PATCH_NOTEBOOK } from '../Notebook/actions';
import { DELETE_NOTEBOOK } from '../Notebook/actions';

const loading = (state = false, action) => {
  switch (action.type) {
    case `${GET_NOTEBOOKS}_REQUEST`:
    case `${POST_NOTEBOOK}_REQUEST`:
      return true;

    case `${GET_NOTEBOOKS}_SUCCESS`:
    case `${GET_NOTEBOOKS}_FAILURE`:
    case `${POST_NOTEBOOK}_SUCCESS`:
    case `${POST_NOTEBOOK}_FAILURE`:
      return false;

    default:
      return state;
  }
};

const notebooks = (state = List(), action) => {
  switch (action.type) {
    case `${GET_NOTEBOOKS}_SUCCESS`:
      return fromJS(action.json);

    case `${POST_NOTEBOOK}_SUCCESS`:
      return state.push(fromJS(action.json));

    case `${PATCH_NOTEBOOK}_SUCCESS`:
      return state.splice(
        state.findIndex(notebook => notebook.get('id') === action.notebookId),
        1,
        fromJS(action.json)
      );

    case `${DELETE_NOTEBOOK}_SUCCESS`:
      return state.splice(state.findIndex(notebook => notebook.get('id') === action.notebookId), 1);

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  notebooks,
});
