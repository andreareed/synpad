import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import ViewNote from './ViewNote';
import EditNote from './EditNote';
import ToggleSwitch from '../../common/components/forms/ToggleSwitch';

class Note extends Component {
  static propTypes = {
    note: PropTypes.instanceOf(Map),
  };

  state = {
    editing: false,
  };

  renderDisplay = () => {
    const { note } = this.props;
    const { editing } = this.state;

    if (editing) {
      return <EditNote note={note} />;
    }
    return <ViewNote note={note} />;
  };

  render() {
    const { note } = this.props;
    const { editing } = this.state;

    if (!note) {
      return null;
    }
    return (
      <div className="note">
        <div className="note-header">
          <div className="note-header-toggle">
            <ToggleSwitch onToggle={() => this.setState({ editing: !editing })} />
            {editing ? 'Save' : 'Edit'}
          </div>
          <h1>{note.get('title')}</h1>
        </div>
        {this.renderDisplay()}
      </div>
    );
  }
}

export default Note;
