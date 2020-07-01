import React from "react";
import PropTypes from "prop-types";
import FavoriteIcon from "./FavoriteIcon";
import WatchlistIcon from "./WatchlistIcon";
// import AppContextHOC from "../HOC/AppContextHOC";
//import CallApi from "../../api/api";
import { Link } from "react-router-dom";
import Image from "../ImageCard/Image";
import { withAuth } from "../../hoc/withAuth";

class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;

    return (
      <div className="card" style={{ width: "100%" }}>
        <Image
          imagePath={imagePath}
          className="card-img-top card-img--height"
        />

        <div className="card-body">
          <Link className="card-title" to={`/movie/${item.id}`}>
            {item.title}
          </Link>
          <div className="d-flex justify-content-between">
            <div className="card-text">Рейтинг: {item.vote_average}</div>
            <div>
              <FavoriteIcon item={item} />
              <WatchlistIcon item={item} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default withAuth(MovieItem);
