import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import NoVideo from "../../../images/no video.jpg";

const getIFrame = (name, src, ...rest) => {
  return <iframe className="iframe-video" {...rest} title={name} frameBorder="0" src={src} allowfullscreen="allowfullscreen"/>;
};

const getVideoContainer = (video) => {
  const { site, key, name } = video;

  switch (site) {
    case "YouTube":
      return getIFrame(name, `https://www.youtube.com/embed/${key}?controls=1`);
    case "Vimeo":
      return getIFrame(
        name,
        `https://vimeo.com/video/${key}?title=0&byline=0`,
        "webkitallowfullscreen mozallowfullscreen"
      );
    default:
      return NoVideo;
  }
};

function MovieVideo(props) {
  console.log("MovieVideo props", props);

  const movieId = props.match.params.movieId;
  const [videos, setVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false);

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

  if (!videosLoaded) {
    return <div className="loader text-center" />;
  }
  if (videos.length === 0) {
    return (
      <img className="card-img-top card-img--height" src={NoVideo} alt="" />
    );
  }
  return (
    <div className="content">
      <div className="row">
        {videos.map((video, index) => {
          return <div className="col-6 ">{getVideoContainer(video)}</div>;
        })}
      </div>
    </div>
    // <Container>
    //   {videos.map((video, index) => {
    //     return (
    //       <div className="row">
    //         <div className="col-6 video-col-6">{getVideoContainer(video)}</div>
    //       </div>
    //       // <Row key={index}>
    //       //   <Col className="col-6 videoWrapper">{getVideoContainer(video)}</Col>
    //       // </Row>
    //     );
    //   })}
    // </Container>
  );
}

export default MovieVideo;
