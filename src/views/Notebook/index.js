import { connect } from 'react-redux';
import Notebook from './Notebook';

import { getNotebook } from './actions';

const mapStateToProps = state => {
  return {
    loading: state.notebook.loading,
    notebook: state.notebook.notebook,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotebook: id => dispatch(getNotebook(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebook);
