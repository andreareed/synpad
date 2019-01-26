import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import NotebookForm from './NotebookForm';

import Loading from '../../common/components/Loading';
import Icon from '../../common/components/Icon/Icon';
import NoContentPlaceholder from '../../common/components/NoContentPlaceholder';
import Modal from '../../common/components/Modal';

class Notebooks extends Component {
  static propTypes = {
    notebooks: PropTypes.instanceOf(List).isRequired,
    getNotebooks: PropTypes.func.isRequired,
    postNotebook: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notebooks: List(),
    getNotebooks: null,
    postNotebook: null,
  };

  state = {
    notebookModalVisible: false,
  };

  componentDidMount() {
    const { notebooks, getNotebooks } = this.props;
    if (!notebooks.size) {
      getNotebooks();
    }
  }

  toggleModal = () => this.setState({ notebookModalVisible: !this.state.notebookModalVisible });

  renderNotebookModal = () => {
    const { postNotebook } = this.props;
    const { notebookModalVisible } = this.state;
    return (
      <Modal isVisible={notebookModalVisible} onClose={this.toggleModal}>
        <NotebookForm onSubmit={postNotebook} onClose={this.toggleModal} />
      </Modal>
    );
  };

  render() {
    const { loading, notebooks } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (!notebooks.size) {
      return (
        <div className="notebooks">
          <div className="container">
            <Icon icon="Plus" onClick={this.toggleModal} />
            <NoContentPlaceholder
              title="No notebooks found"
              message={
                <div className="notebooks-placeholder-message">
                  Click the <Icon icon="Plus" onClick={this.toggleModal} /> to add one!
                </div>
              }
            />
          </div>
          {this.renderNotebookModal()}
        </div>
      );
    }

    return (
      <div className="notebooks">
        <div className="container">
          <Icon icon="Plus" onClick={this.toggleModal} />
        </div>
        {this.renderNotebookModal()}
      </div>
    );
  }
}

export default Notebooks;
