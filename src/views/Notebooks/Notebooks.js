import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Loading from '../../common/components/Loading';

class Notebooks extends Component {
  static propTypes = {
    notebooks: PropTypes.instanceOf(List).isRequired,
    getNotebooks: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { notebooks, getNotebooks } = this.props;
    if (!notebooks.size) {
      getNotebooks();
    }
  }

  render() {
    const { loading, notebooks } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div className="notebooks">
        <div className="container">Notebooks</div>
      </div>
    );
  }
}

export default Notebooks;
