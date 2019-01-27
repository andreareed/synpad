import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

class Notebook extends Component {
  static propTypes = {
    notebook: PropTypes.instanceOf(Map).isRequired,
    getNotebook: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notebook: Map(),
    getNotebook: null,
  };

  componentDidMount() {
    const { getNotebook, match } = this.props;
    getNotebook(match.params.notebookId);
  }

  render() {
    const { notebook } = this.props;
    return (
      <div>
        <h1>{notebook.get('title')}</h1>
      </div>
    );
  }
}

export default Notebook;
