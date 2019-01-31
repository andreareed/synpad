import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Icon from '../../common/components/Icon/Icon';

class Sidebar extends Component {
  static propTypes = {
    notebook: PropTypes.instanceOf(Map),
    addNote: PropTypes.func.isRequired,
    viewNote: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notebook: Map(),
    addNote: () => {},
  };

  renderNote = note => {
    const { viewNote } = this.props;
    return (
      <div key={note.get('id')} onClick={() => viewNote(note)} className="sidebar-note">
        {note.get('title')}
      </div>
    );
  };

  render() {
    const { notebook, addNote, loading } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div className="sidebar">
        <h2>{notebook.get('title')}</h2>
        <div className="sidebar-description">{notebook.get('description')}</div>
        <div className="sidebar-add">
          <Icon icon="Plus" onClick={() => addNote(notebook.get('id'))} />
          New Note
        </div>
        <div className="sidebar-notes">{notebook.get('notes').map(this.renderNote)}</div>
      </div>
    );
  }
}

export default Sidebar;