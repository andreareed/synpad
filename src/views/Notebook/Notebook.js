import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';

import Sidebar from './Sidebar';
import Note from './Note';
import Loading from '../../common/components/Loading';
import Modal from '../../common/components/Modal';
import Icon from '../../common/components/Icon/Icon';
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
    deleteNoteModalVisible: false,
    deleteNotebookModalVisible: false,
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

  toggleNoteModal = () => this.setState({ deleteNoteModalVisible: !this.state.deleteNoteModalVisible });
  toggleNotebookModal = () => this.setState({ deleteNotebookModalVisible: !this.state.deleteNotebookModalVisible });

  renderModal = () => {
    const { deleteNoteModalVisible, deleteNotebookModalVisible, deleteConfirmation, activeNote } = this.state;
    const { notebook } = this.props;

    if (deleteNotebookModalVisible) {
      return (
        <Modal isVisible={true} onClose={this.toggleNotebookModal} className="notebook-delete-modal">
          <h1>Delete this notebook?</h1>
          <div className="notebook-delete-message">
            This action cannot be undone. If you're sure, type <span>{notebook.get('title')}</span> to confirm and this
            note will be deleted.
            <form>
              <InputWrapper>
                <input
                  value={deleteConfirmation}
                  onChange={({ target }) => this.setState({ deleteConfirmation: target.value })}
                />
              </InputWrapper>
              <div className="notebook-delete-buttons">
                <button type="button" className="btn" onClick={this.toggleNotebookModal}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={this.onDeleteNotebook}
                  disabled={deleteConfirmation !== notebook.get('title')}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </Modal>
      );
    }

    if (deleteNoteModalVisible) {
      return (
        <Modal isVisible={true} onClose={this.toggleNoteModal} className="notebook-delete-modal">
          <h1>Delete this note?</h1>
          <div className="notebook-delete-message">
            This action cannot be undone. If you're sure, type <span>{activeNote.get('title')}</span> to confirm and
            this note will be deleted.
            <form>
              <InputWrapper>
                <input
                  value={deleteConfirmation}
                  onChange={({ target }) => this.setState({ deleteConfirmation: target.value })}
                />
              </InputWrapper>
              <div className="notebook-delete-buttons">
                <button type="button" className="btn" onClick={this.toggleNoteModal}>
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
    }
    return null;
  };

  onDeleteNote = () => {
    const { deleteNote } = this.props;
    const { activeNote } = this.state;

    deleteNote(activeNote.get('id'), activeNote.get('notebook_id'));
    this.setState({ collapseSidebar: false, activeNote: null, deleteConfirmation: '', deleteNoteModalVisible: false });
  };

  onDeleteNotebook = () => {
    const { deleteNotebook, notebook, history } = this.props;

    this.setState({ deleteConfirmation: '', deleteNotebookModalVisible: false });
    deleteNotebook(notebook.get('id')).then(() => history.push('/'));
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
          title={notebook.get('title')}
          items={notebook.get('notes')}
          collapse={collapseSidebar}
          addItem={() => postNote(notebook.get('id'))}
          addText="New Note"
          viewItem={activeNote => this.setState({ activeNote, collapseSidebar: !collapseSidebar })}
          deleteItem={() => this.setState({ deleteNotebookModalVisible: true })}
          collapseSidebar={() => this.setState({ collapseSidebar: !collapseSidebar })}
          loading={notebookUpdating}
          backButton={
            <Link to="/">
              <Icon icon="BackArrow" /> Back to Notebooks
            </Link>
          }
        />
        <Note
          note={activeNote}
          onSave={patchNote}
          expand={collapseSidebar}
          deleteNote={() => this.setState({ deleteNoteModalVisible: true })}
        />
        {this.renderModal()}
      </div>
    );
  }
}

export default Notebook;
