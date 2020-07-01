import React from "react";
// import { AppContext } from "../App";
import { connect } from "react-redux";
import * as authActions from "../redux/auth/auth.actions";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    // user: state.auth.user,
    // session_id: state.auth.session_id,
    // isAuth: state.auth.isAuth,
    // showModal: state.auth.showModal,
  };
};
const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch)
  // updateAuth,
  // fetchAuth,
  // fetchFavorite,
  // onLogOut,
  // toggleShowLogin,
  // updateFavorite,
  // updateWatchlist,
});

export const withAuth = (Component) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class WithAuth extends React.Component {
      render() {
        return <Component {...this.props} />;
      }
    }
  );
