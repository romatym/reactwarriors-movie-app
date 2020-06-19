

export const updateAuth = (payload) => {
    return {
      type: "UPDATEAUTH",
      payload,
    };
  };
  
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