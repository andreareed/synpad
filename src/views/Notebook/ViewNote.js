import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

class ViewNote extends Component {
  static propTypes = {
    note: PropTypes.instanceOf(Map),
  };

  render() {
    const { note } = this.props;

    if (!note) {
      return null;
    }
    return (
      <div className="view-note">
        <div className="view-note-content">{note.get('content')}</div>
      </div>
    );
  }
}

export default ViewNote;
