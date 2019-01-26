import { connect } from 'react-redux';
import Notebooks from './Notebooks';

import { getNotebooks } from './actions';

const mapStateToProps = state => {
  return {
    loading: state.notebooks.loading,
    notebooks: state.notebooks.notebooks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotebooks: () => dispatch(getNotebooks()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebooks);
