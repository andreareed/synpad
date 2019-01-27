import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Sidebar from './Sidebar';
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

  componentDidMount() {
    const { getNotebook, match } = this.props;
    getNotebook(match.params.notebookId);
  }

  render() {
    const { notebook, loading, postNote } = this.props;

    if (loading) {
      return <Loading />;
    }
    console.log('---', loading, notebook.toJS());
    return (
      <div>
        <Sidebar notebook={notebook} addNote={postNote} />
      </div>
    );
  }
}

export default Notebook;
