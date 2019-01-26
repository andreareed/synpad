import React from 'react';
import PropTypes from 'prop-types';

const NoContentPlaceholder = props => {
  return (
    <div className="placeholder">
      <h1>{props.title}</h1>
      <p>{props.message}</p>
    </div>
  );
};

NoContentPlaceholder.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

NoContentPlaceholder.defaultProps = {
  title: 'Nothing here',
};

export default NoContentPlaceholder;
