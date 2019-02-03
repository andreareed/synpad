import { connect } from 'react-redux';
import Notebook from './Notebook';

import { getNotebook, postNote, patchNote } from './actions';

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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebook);
