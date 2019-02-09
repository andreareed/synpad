import { connect } from 'react-redux';
import Notebook from './Notebook';

import { getNotebook, postNote, patchNote, deleteNote, deleteNotebook, patchNotebook } from './actions';

const mapStateToProps = state => {
  return {
    loading: state.notebook.loading,
    notebook: state.notebook.notebook.get('data'),
    notebookUpdating: state.notebook.notebook.get('loading'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotebook: id => dispatch(getNotebook(id)),
    postNote: notebookId => dispatch(postNote(notebookId)),
    patchNote: (noteId, values) => dispatch(patchNote(noteId, values)),
    deleteNote: (noteId, notebookId) => dispatch(deleteNote(noteId, notebookId)),
    deleteNotebook: notebookId => dispatch(deleteNotebook(notebookId)),
    patchNotebook: (notebookId, values) => dispatch(patchNotebook(notebookId, values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebook);
