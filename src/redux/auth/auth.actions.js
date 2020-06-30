import CallApi from "../../api/api";

export const fetchAuth = (session_id) => (dispatch) => {
  dispatch({
    type: "REQUEST_AUTH",
  });

  CallApi.get("/account", {
    params: { session_id },
  })
    .then((user) => {
      dispatch(updateAuth({ user, session_id }));
      dispatch(fetchFavorite(user, session_id));
      dispatch(fetchWatchlist(user, session_id));
    })
    .catch((error) => {
      dispatch({
        type: "FETCH_ERROR_AUTH",
        payload: error,
      });
    });
};

export const fetchFavorite = (user, session_id) => (dispatch) => {
  CallApi.get(`/account/${user.id}/favorite/movies`, {
    params: {
      session_id: session_id,
      language: "ru-RU",
    },
  }).then((data) => {
    dispatch(updateFavorite(data.results));
  });
};

export const fetchWatchlist = (user, session_id) => (dispatch) => {
  CallApi.get(`/account/${user.id}/watchlist/movies`, {
    params: {
      session_id: session_id,
      language: "ru-RU",
    },
  }).then((data) => {
    dispatch(updateWatchlist(data.results));
  });
};

export const updateAuth = ({ user, session_id }) => ({
  type: "UPDATE_AUTH",
  payload: {
    user,
    session_id,
  },
});

export const onLogOut = () => {
  return {
    type: "LOGOUT",
  };
};

export const toggleShowLogin = () => {
  return {
    type: "TOGGLE_SHOWLOGIN",
  };
};

export const updateFavorite = () => {
  return {
    type: "UPDATE_FAVORITE",
  };
};

export const updateWatchlist = () => {
  return {
    type: "UPDATE_WATCHLIST",
  };
};
