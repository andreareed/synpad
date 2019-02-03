import React from 'react';
import classNames from 'classnames';
import Icon from './Icon/Icon';

const Loading = props => {
  return (
    <div className={classNames('loading-wrapper', props.className)}>
      <Icon icon="Loading" />
    </div>
  );
};

export default Loading;
