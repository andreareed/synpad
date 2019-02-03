import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Sidebar from './Sidebar';
import Note from './Note';
import Loading from '../../common/components/Loading';

class Notebook extends Component {
  static propTypes = {
    notebook: PropTypes.instanceOf(Map).isRequired,
    getNotebook: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    postNote: PropTypes.func.isRequired,
    patchNote: PropTypes.func.isRequired,
    notebookUpdating: PropTypes.bool,
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
  };

  componentDidMount() {
    const { getNotebook, match } = this.props;
    getNotebook(match.params.notebookId);
  }

  onUpdateNote = note => {
    this.setState({ activeNote: note });
  };

  onDeleteNote = () => {
    this.setState({ collapseSidebar: false, activeNote: null });
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
          onUpdate={this.onUpdateNote}
          expand={collapseSidebar}
          deleteNote={this.onDeleteNote}
        />
      </div>
    );
  }
}

export default Notebook;
