import { combineReducers } from 'redux';
import { fromJS, Map } from 'immutable';

import { GET_NOTEBOOK, POST_NOTE, PATCH_NOTE } from './actions';

const loading = (state = true, action) => {
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

    case `${POST_NOTE}_SUCCESS`:
      return state.set('notes', state.get('notes').push(fromJS(action.json)));

    case `${PATCH_NOTE}_SUCCESS`:
      return state.setIn(
        ['notes', state.get('notes').findIndex(note => note.get('id') === action.noteId)],
        fromJS(action.json)
      );

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  notebook,
});
