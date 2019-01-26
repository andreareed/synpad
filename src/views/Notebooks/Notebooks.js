import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Loading from '../../common/components/Loading';
import Icon from '../../common/components/Icon/Icon';
import NoContentPlaceholder from '../../common/components/NoContentPlaceholder';

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

    if (!notebooks.size) {
      return (
        <div className="notebooks">
          <div className="container">
            <Icon icon="Plus" />
            <NoContentPlaceholder
              title="No notebooks found"
              message={
                <div className="notebooks-placeholder-message">
                  Click the <Icon icon="Plus" /> to add one!
                </div>
              }
            />
          </div>
        </div>
      );
    }

    return (
      <div className="notebooks">
        <div className="container">
          <Icon icon="Plus" />
        </div>
      </div>
    );
  }
}

export default Notebooks;
