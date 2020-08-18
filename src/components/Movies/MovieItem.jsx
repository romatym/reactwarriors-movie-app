import React from "react";
import PropTypes from "prop-types";
import FavoriteIcon from "./FavoriteIcon";
import WatchlistIcon from "./WatchlistIcon";
import { Link } from "react-router-dom";
import Image from "../ImageCard/Image";
import NoImage from "../../images/no image.png";
import { withAuth } from "../../hoc/withAuth";

class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;

    return (
      <div className="card width100 shadow mb-3 bg-white rounded">
        <Link to={`/movie/${item.id}/details`}>
          <Image
            imagePath={imagePath}
            notAvailablePath={NoImage}
            className="card-img-top card-img--height"
          />
        </Link>

        <div className="card-body p-3">
          <Link className="card-title movie-title" to={`/movie/${item.id}/details`}>
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
