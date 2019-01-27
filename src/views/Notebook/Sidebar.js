import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Icon from '../../common/components/Icon/Icon';

class Sidebar extends Component {
  static propTypes = {
    notebook: PropTypes.instanceOf(Map),
    addNote: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notebook: Map(),
    addNote: () => {},
  };

  renderNote = note => <div key={note.get('id')}>{note.get('title')}</div>;

  render() {
    const { notebook, addNote, loading } = this.props;

    if (loading) {
      return null;
    }
    return (
      <div>
        <h3>{notebook.get('title')}</h3>
        {notebook.get('description')}
        <Icon icon="Plus" onClick={() => addNote(notebook.get('id'))} />
        {notebook.get('notes').map(this.renderNote)}
      </div>
    );
  }
}

export default Sidebar;
