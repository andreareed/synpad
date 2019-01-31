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
      <div>
        <h1>{note.get('title')}</h1>
        {note.get('content')}
      </div>
    );
  }
}

export default ViewNote;
