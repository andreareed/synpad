import React from 'react';
import PropTypes from 'prop-types';

const ToggleSwitch = props => (
  <label className="switch">
    <input type="checkbox" onChange={props.onToggle} />
    <span className="slider round" />
  </label>
);

ToggleSwitch.propTypes = {
  onToggle: PropTypes.func,
};

export default ToggleSwitch;
