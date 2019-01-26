import { connect } from 'react-redux';
import Notebooks from './Notebooks';

import { getNotebooks, postNotebook } from './actions';

const mapStateToProps = state => {
  return {
    loading: state.notebooks.loading,
    notebooks: state.notebooks.notebooks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotebooks: () => dispatch(getNotebooks()),
    postNotebook: values => dispatch(postNotebook(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebooks);
