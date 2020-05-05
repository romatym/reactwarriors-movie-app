import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardImg,
  //CardSubtitle,
  CardTitle,
  //CardText,
  Row,
  Col,
} from "reactstrap";

function MovieVideo(props) {
  const movieId = props.match.params.id;
  const [movie, setMovie] = useState();
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


  return (
    <TabPane tabId="2">
      <Row>
        {!videosLoaded && <div className="loader text-center"></div>}
        {videos.map((video) => {
          return (
            <Card body>
              <a
                href={`https://www.youtube.com/watch?v=${video.key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardImg
                  top
                  width="100%"
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  alt=""
                />
              </a>

              <CardTitle className="text-center">{video.name}</CardTitle>
            </Card>
          );
        })}
      </Row>
    </TabPane>
  );
}

export default MovieVideo;
