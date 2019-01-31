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
  };

  static defaultProps = {
    notebook: Map(),
    loading: false,
    getNotebook: () => {},
    postNote: () => {},
  };

  state = {
    activeNote: null,
  };

  componentDidMount() {
    const { getNotebook, match } = this.props;
    getNotebook(match.params.notebookId);
  }

  render() {
    const { notebook, loading, postNote } = this.props;
    const { activeNote } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div className="notebook">
        <Sidebar
          notebook={notebook}
          addNote={postNote}
          viewNote={activeNote => this.setState({ activeNote })}
        />
        <Note note={activeNote} />
      </div>
    );
  }
}

export default Notebook;
