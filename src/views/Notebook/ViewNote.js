import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-it';

class ViewNote extends Component {
  static propTypes = {
    note: PropTypes.object,
  };

  render() {
    const { note } = this.props;
    const md = Markdown();

    if (!note) {
      return null;
    }
    return (
      <div className="view-note">
        <div className="view-note-content" dangerouslySetInnerHTML={{ __html: md.render(note.content || '') }} />
      </div>
    );
  }
}

export default ViewNote;
