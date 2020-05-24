import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import NoVideo from "../../../images/no video.jpg";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

function MovieVideo(props) {
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

  // console.log("videos.length === 0", videos.length === 0);

  return (
    <Row>
      {!videosLoaded && <div className="loader text-center"></div>}

      {Boolean(videosLoaded & (videos.length === 0)) && (
        <img className="card-img-top card-img--height" src={NoVideo} alt="" />
      )}

      {videos.map((video, index) => {
        let videoContainer = "";
        if (video.site === "YouTube") {
          videoContainer = (
            <iframe
              title={video.name}
              className="video"
              frameBorder="0"
              src={`https://www.youtube.com/embed/${video.key}?controls=0`}
            />
          );
        } else if (video.site === "Vimeo") {
          videoContainer = (
            <iframe
              title={video.name}
              className="video"
              frameBorder="0"
              webkitallowfullscreen
              mozallowfullscreen
              src={`https://vimeo.com/video/${video.key}?title=0&byline=0`}
            />
          );
        } else {
          videoContainer = (
            <img
              className="card-img-top card-img--height"
              src="/images/no video.jpg"
              alt=""
            />
          );
        }

        console.log("video.name", video.name);
        // style={{ width: "50%" }}

        return (
          <Col sm="6" key={index}>
            <Card 
              //style={{ width: "50%" }}
              body
              className="video-container"
            >
              <CardBody>
                <CardTitle>{video.name}</CardTitle>
                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
              </CardBody>
              {/* <CardTitle className="text-center">{video.name}</CardTitle> */}
              <CardBody >
                <iframe
                
                  // title={video.name}
                  title={video.name}
                  className="video"
                  frameBorder="0"
                  src={`https://www.youtube.com/embed/${video.key}?controls=0`}
                />
              </CardBody>
              {/* {videoContainer} */}
              {/* <img
              className="card-img-top card-img--height"
              src={NoVideo}
              alt=""
            /> */}
              {/* <h2>{video.name}</h2> */}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default MovieVideo;
