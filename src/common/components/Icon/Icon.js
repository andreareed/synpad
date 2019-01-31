import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = props => {
  const IconComponent = require(`./icons/${props.icon}`).default;
  return (
    <span className={classNames(['icon', props.className])} onClick={props.onClick}>
      <IconComponent />
    </span>
  );
};

Icon.displayName = 'Icon';
Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
Icon.defaultProps = {
  className: null,
};

export default Icon;
