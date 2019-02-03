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

const notebook = (state = Map({ loading: false, data: Map() }), action) => {
  switch (action.type) {
    case `${POST_NOTE}_REQUEST`:
      return state.set('loading', true);

    case `${POST_NOTE}_FAILURE`:
      return state.set('loading', false);

    case `${GET_NOTEBOOK}_SUCCESS`:
      return state.set('data', fromJS(action.json));

    case `${POST_NOTE}_SUCCESS`:
      state = state.set('loading', false);
      return state.setIn(['data', 'notes'], state.getIn(['data', 'notes']).push(fromJS(action.json)));

    case `${PATCH_NOTE}_SUCCESS`:
      return state.setIn(
        ['data', 'notes', state.get('notes').findIndex(note => note.get('id') === action.noteId)],
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
