import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Sidebar from './Sidebar';
import Note from './Note';
import Loading from '../../common/components/Loading';
import Modal from '../../common/components/Modal';
import InputWrapper from '../../common/components/forms/InputWrapper';

class Notebook extends Component {
  static propTypes = {
    notebook: PropTypes.instanceOf(Map).isRequired,
    getNotebook: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    postNote: PropTypes.func.isRequired,
    patchNote: PropTypes.func.isRequired,
    notebookUpdating: PropTypes.bool,
    deleteNote: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notebook: Map(),
    loading: false,
    getNotebook: () => {},
    postNote: () => {},
  };

  state = {
    activeNote: null,
    collapseSidebar: false,
    deleteModalVisible: false,
    deleteConfirmation: '',
  };

  componentDidMount() {
    const { getNotebook, match } = this.props;
    getNotebook(match.params.notebookId);
  }

  componentDidUpdate(prevProps) {
    const { notebook } = this.props;
    const { activeNote } = this.state;

    if (prevProps !== this.props && prevProps.notebook.get('notes') && activeNote) {
      const index = prevProps.notebook.get('notes').findIndex(note => note.get('id') === activeNote.get('id'));
      this.setState({ activeNote: notebook.getIn(['notes', index]) });
    }
  }

  toggleModal = () => this.setState({ deleteModalVisible: !this.state.deleteModalVisible });

  renderDeleteModal = () => {
    const { deleteModalVisible, deleteConfirmation, activeNote } = this.state;

    if (!activeNote) {
      return null;
    }

    return (
      <Modal isVisible={deleteModalVisible} onClose={this.toggleModal} className="note-delete-modal">
        <h1>Delete this note?</h1>
        <div className="note-delete-message">
          This action cannot be undone. If you're sure, type <span>{activeNote.get('title')}</span> to confirm and this
          note will be deleted.
          <form>
            <InputWrapper>
              <input
                value={deleteConfirmation}
                onChange={({ target }) => this.setState({ deleteConfirmation: target.value })}
              />
            </InputWrapper>
            <div className="note-delete-buttons">
              <button type="button" className="btn" onClick={this.toggleModal}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                onClick={this.onDeleteNote}
                disabled={deleteConfirmation !== activeNote.get('title')}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  };

  onDeleteNote = () => {
    const { deleteNote } = this.props;
    const { activeNote } = this.state;

    deleteNote(activeNote.get('id'), activeNote.get('notebook_id'));
    this.setState({ collapseSidebar: false, activeNote: null, deleteConfirmation: '', deleteModalVisible: false });
  };

  render() {
    const { notebook, loading, postNote, patchNote, notebookUpdating } = this.props;
    const { activeNote, collapseSidebar } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (!notebook.size) {
      return 'Notebook not found';
    }

    return (
      <div className="notebook">
        <Sidebar
          notebook={notebook}
          addNote={postNote}
          collapse={collapseSidebar}
          viewNote={activeNote => this.setState({ activeNote, collapseSidebar: !collapseSidebar })}
          collapseSidebar={() => this.setState({ collapseSidebar: !collapseSidebar })}
          loading={notebookUpdating}
        />
        <Note
          note={activeNote}
          onSave={patchNote}
          expand={collapseSidebar}
          deleteNote={() => this.setState({ deleteModalVisible: true })}
        />
        {this.renderDeleteModal()}
      </div>
    );
  }
}

export default Notebook;
