import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import classNames from 'classnames';

import Icon from '../../common/components/Icon/Icon';
import Loading from '../../common/components/Loading';

class Sidebar extends Component {
  static propTypes = {
    notebook: PropTypes.instanceOf(Map),
    addNote: PropTypes.func.isRequired,
    viewNote: PropTypes.func.isRequired,
    deleteNotebook: PropTypes.func.isRequired,
    loading: PropTypes.bool,
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
    const { notebook, addNote, loading, collapseSidebar, collapse, deleteNotebook } = this.props;

    return (
      <div className="sidebar-wrapper">
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
          <div className="sidebar-notes">
            {loading ? <Loading className="sidebar-loading" /> : notebook.get('notes').map(this.renderNote)}
          </div>
          <div className="sidebar-edit-notebook">
            Edit Notebook <Icon icon="Trash" onClick={deleteNotebook} />
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
