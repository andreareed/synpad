import { combineReducers } from 'redux';
import { fromJS, Map } from 'immutable';

import { GET_NOTEBOOK, POST_NOTE, PATCH_NOTE, DELETE_NOTE, DELETE_NOTEBOOK, PATCH_NOTEBOOK } from './actions';

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
    case `${GET_NOTEBOOK}_SUCCESS`:
      return state.set('data', fromJS(action.json));

    case `${POST_NOTE}_REQUEST`:
    case `${DELETE_NOTEBOOK}_REQUEST`:
      return state.set('loading', true);

    case `${POST_NOTE}_FAILURE`:
    case `${DELETE_NOTEBOOK}_SUCCESS`:
    case `${DELETE_NOTEBOOK}_FAILURE`:
    case `${PATCH_NOTEBOOK}_FAILURE`:
      return state.set('loading', false);

    case `${PATCH_NOTEBOOK}_SUCCESS`:
      state = state.set('loading', false);
      return state.set('data', fromJS(action.json));

    case `${POST_NOTE}_SUCCESS`:
      state = state.set('loading', false);
      return state.setIn(['data', 'notes'], state.getIn(['data', 'notes']).push(fromJS(action.json)));

    case `${PATCH_NOTE}_REQUEST`:
      state = state.removeIn([
        'data',
        'notes',
        state.getIn(['data', 'notes']).findIndex(note => note.get('id') === action.noteId),
      ]);
      return state.setIn(['data', 'notes'], state.getIn(['data', 'notes']).splice(0, 0, fromJS(action.payload)));

    case `${PATCH_NOTE}_FAILURE`:
      return state.setIn(
        ['data', 'notes', state.getIn(['data', 'notes']).findIndex(note => note.get('id') === action.noteId)],
        fromJS(action.json)
      );

    case `${DELETE_NOTE}_REQUEST`:
      return state.removeIn([
        'data',
        'notes',
        state.getIn(['data', 'notes']).findIndex(note => note.get('id') === action.noteId),
      ]);

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  notebook,
});
