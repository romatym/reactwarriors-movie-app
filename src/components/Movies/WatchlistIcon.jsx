import React from "react";
import PropTypes from "prop-types";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import CallApi from "../../api/api";
// import AppContextHOC from "../HOC/AppContextHOC";
import { withAuth } from "../../hoc/withAuth";

const WatchlistIcon = (props) => {
  const { item } = props;
  const { watchlist } = props.auth;

  const isWatchlist = watchlist.some((movie) => movie.id === item.id);

  const onClickWatchlist = () => {
    const { user, session_id, getWatchlistMovies, toggleShowLogin } = props;
    if (!session_id) {
      toggleShowLogin();
      return;
    }

    CallApi.post(`/account/${user.id}/watchlist`, {
      params: {
        session_id,
        media_type: "movie",
        media_id: item.id,
        watchlist: !isWatchlist,
      },
    })
      .then(() => {
        getWatchlistMovies(user, session_id);
      })
      .catch((error) => {});
  };

  return isWatchlist ? (
    <Bookmark onClick={onClickWatchlist} />
  ) : (
    <BookmarkBorder onClick={onClickWatchlist} />
  );
};

WatchlistIcon.propTypes = {
  item: PropTypes.object.isRequired,
  // isWatchlist: PropTypes.bool.isRequired,
  // onClickWatchlist: PropTypes.func.isRequired
};

export default withAuth(WatchlistIcon);
