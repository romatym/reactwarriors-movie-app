import React from "react";
import PropTypes from "prop-types";
import { CardImg } from "reactstrap";

const ImageCard = (props) => {
  const { imagePath, notAvailablePath = "", className = "" } = props;

  console.log("imagePath", imagePath);

  return (
    // <img
    <CardImg

      className={className}
      src={
        imagePath
          ? `https://image.tmdb.org/t/p/w500${imagePath}`
          : notAvailablePath
      }
      alt=""
    />
  );
};

ImageCard.propTypes = {
  imagePath: PropTypes.string.isRequired,
};

export default ImageCard;
