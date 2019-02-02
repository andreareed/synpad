import { connect } from 'react-redux';
import Account from './Account';

import { updateUser } from '../../redux/actions';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (userId, payload) => dispatch(updateUser(userId, payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
