import { connect } from 'react-redux';
import Landing from './Landing';

import { loginUser, registerUser } from '../../redux/actions';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: values => dispatch(loginUser(values)),
    registerUser: values => dispatch(registerUser(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
