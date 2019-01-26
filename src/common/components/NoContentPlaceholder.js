import React from 'react';
import PropTypes from 'prop-types';

const NoContentPlaceholder = props => {
  return (
    <div className="placeholder">
      <h1>{props.title}</h1>
      {props.message}
    </div>
  );
};

NoContentPlaceholder.propTypes = {
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

NoContentPlaceholder.defaultProps = {
  title: 'Nothing here',
};

export default NoContentPlaceholder;
