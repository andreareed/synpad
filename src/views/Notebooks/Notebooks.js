import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import classNames from 'classnames';

import NotebookForm from './NotebookForm';
import Sidebar from '../Notebook/Sidebar';

import Loading from '../../common/components/Loading';
import Icon from '../../common/components/Icon/Icon';
import NoContentPlaceholder from '../../common/components/NoContentPlaceholder';

class Notebooks extends Component {
  static propTypes = {
    notebooks: PropTypes.instanceOf(List).isRequired,
    getNotebooks: PropTypes.func.isRequired,
    postNotebook: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notebooks: List(),
    getNotebooks: () => {},
    postNotebook: () => {},
  };

  state = {
    collapseSidebar: false,
    addingNotebook: false,
  };

  componentDidMount() {
    const { notebooks, getNotebooks } = this.props;
    if (!notebooks.size) {
      getNotebooks();
    }
  }

  renderPlaceholder = () => (
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
    </div>
  );

  postNotebook = title => {
    const { postNotebook, history } = this.props;

    postNotebook(title).then(action => {
      if (action.response.ok) {
        this.setState({ addingNotebook: false }, () => history.push(`/${action.json.id}`));
      }
    });
  };

  render() {
    const { loading, notebooks, history } = this.props;
    const { collapseSidebar, addingNotebook } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div className="notebooks">
        <Sidebar
          title="Notebooks"
          items={notebooks}
          collapse={collapseSidebar}
          addItem={() => this.setState({ addingNotebook: true })}
          addText="New Notebook"
          viewItem={notebook => history.push(`/${notebook.get('id')}`)}
          deleteItem={() => this.setState({ deleteNotebookModalVisible: true })}
          collapseSidebar={() => this.setState({ collapseSidebar: !collapseSidebar })}
          hideDelete
        />
        <div className={classNames('notebookDisplay', { expand: collapseSidebar })}>
          {!addingNotebook && !notebooks.size && this.renderPlaceholder()}
          {addingNotebook && <NotebookForm className="notebook-add-form" onSubmit={this.postNotebook} />}
        </div>
      </div>
    );
  }
}

export default Notebooks;
