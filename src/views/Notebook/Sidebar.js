import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import classNames from 'classnames';

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
    const { notebook, addNote, loading, collapseSidebar, collapse } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div className={classNames('sidebar', { collapse })}>
        <div className="sidebar-header">
          <h2>{notebook.get('title')}</h2>
          <div className="sidebar-tab" onClick={() => collapseSidebar()}>
            <Icon icon={collapse ? 'RightArrow' : 'LeftArrow'} />
          </div>
        </div>
        <div className="sidebar-description">{notebook.get('description')}</div>
        <div className="sidebar-add" onClick={() => addNote(notebook.get('id'))}>
          <Icon icon="Plus" />
          New Note
        </div>
        <div className="sidebar-notes">{notebook.get('notes').map(this.renderNote)}</div>
      </div>
    );
  }
}

export default Sidebar;
