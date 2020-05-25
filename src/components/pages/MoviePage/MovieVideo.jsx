import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import NoVideo from "../../../images/no video.jpg";
import {
  Card,
  Media,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

function MovieVideo(props) {
  const movieId = props.match.params.movieId;
  const [videos, setVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [videoIsOpen, setVideoIsOpen] = useState(false);

  useEffect(() => {
    CallApi.get(`/movie/${movieId}/videos`, {
      params: {
        language: "ru-RU",
      },
    }).then((data) => {
      setVideos(data.results);
      setVideosLoaded(true);
    });
  }, [movieId]);

  return (
    <Container 
    //className="video-container"
    >
      {!videosLoaded && <div className="loader text-center"></div>}

      {Boolean(videosLoaded & (videos.length === 0)) && (
        <img className="card-img-top card-img--height" src={NoVideo} alt="" />
      )}

      {videos.map((video, index) => {
        return (
          <Row>
            <Col>
              {/* <img
                className="card-img-top card-img--height"
                src={NoVideo}
                alt=""
              /> */}
              <iframe
                className="video-container "
                title={video.name}
                frameBorder="0"
                src={`https://www.youtube.com/embed/${video.key}?controls=0`}
              />
            </Col>
          </Row>
        );
        // let videoContainer = "";
        // if (video.site === "YouTube") {
        //   videoContainer = (
        //     <iframe
        //       title={video.name}
        //       className="video"
        //       frameBorder="0"
        //       src={`https://www.youtube.com/embed/${video.key}?controls=0`}
        //     />
        //   );
        // } else if (video.site === "Vimeo") {
        //   videoContainer = (
        //     <iframe
        //       title={video.name}
        //       className="video"
        //       frameBorder="0"
        //       webkitallowfullscreen
        //       mozallowfullscreen
        //       src={`https://vimeo.com/video/${video.key}?title=0&byline=0`}
        //     />
        //   );
        // } else {
        //   videoContainer = (
        //     <img
        //       className="card-img-top card-img--height"
        //       src="/images/no video.jpg"
        //       alt=""
        //     />
        //   );
        // }
      })}
    </Container>
  );
}

export default MovieVideo;
