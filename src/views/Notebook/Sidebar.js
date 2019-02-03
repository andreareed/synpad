import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import classNames from 'classnames';

import Icon from '../../common/components/Icon/Icon';
import Loading from '../../common/components/Loading';

class Sidebar extends Component {
  static propTypes = {
    notebook: PropTypes.instanceOf(Map),
    addItem: PropTypes.func.isRequired,
    viewItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    addText: PropTypes.string,
    backButton: PropTypes.node,
  };

  static defaultProps = {
    items: List(),
    addItem: () => {},
    viewItem: () => {},
  };

  renderItem = item => {
    const { viewItem } = this.props;
    return (
      <div key={item.get('id')} onClick={() => viewItem(item)} className="sidebar-item">
        {item.get('title')}
      </div>
    );
  };

  render() {
    const { title, addItem, loading, collapseSidebar, collapse, deleteItem, addText, items, backButton } = this.props;

    return (
      <div className="sidebar-wrapper">
        <div className={classNames('sidebar', { collapse })}>
          <div className="sidebar-header">
            <div className="sidebar-back">{backButton}</div>
            <div className="sidebar-tab" onClick={() => collapseSidebar()}>
              <Icon icon={collapse ? 'RightArrow' : 'LeftArrow'} />
            </div>
          </div>
          <div className="sidebar-header-title">
            <h2>{title}</h2>
          </div>
          <div className="sidebar-add" onClick={addItem}>
            <Icon icon="Plus" />
            {addText}
          </div>
          <div className="sidebar-items">
            {loading ? <Loading className="sidebar-loading" /> : items.map(this.renderItem)}
          </div>
          {!!deleteItem && (
            <div className="sidebar-edit">
              Edit Notebook <Icon icon="Trash" onClick={deleteItem} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Sidebar;
