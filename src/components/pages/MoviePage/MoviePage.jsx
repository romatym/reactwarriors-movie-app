import React, { useState, useEffect } from "react";
import MoviePreview from "./MoviePreview";
import MovieDetails from "./MovieDetails";
import MovieVideo from "./MovieVideo";
import MovieCast from "./MovieCast";
import CallApi from "../../../api/api";
import {
  Route,
  NavLink as NavLinkRouter,
  Redirect,
  Switch,
  useParams,
} from "react-router-dom";
import { TabPane, Nav, NavItem, NavLink } from "reactstrap";

function MoviePage(props) {
  const { movieId } = useParams(); //props.match.params.id;

  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    CallApi.get(`/movie/${movieId}`, {
      params: {
        language: "ru-RU",
      },
    }).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [movieId]);

  if (isLoading) {
    return <div className="loader" />;
  }

  return (
    <div className="container">
      <MoviePreview movie={movie} />
      {/* <MovieTabs movieId={movieId} /> */}
      <Nav tabs>
        <NavItem>
          <NavLink tag={NavLinkRouter} to={`/movie/${movieId}/details`}>
            Детали
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={NavLinkRouter} to={`/movie/${movieId}/cast`}>
            Актеры
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={NavLinkRouter} to={`/movie/${movieId}/video`}>
            Видео
          </NavLink>
        </NavItem>
      </Nav>
      <TabPane>
        <Switch>
          <Route path="/movie/:movieId/video" component={MovieVideo} />
          <Route path="/movie/:movieId/cast" component={MovieCast} />
          <Route
            path="/movie/:movieId/details"
            render={(props) => <MovieDetails {...props} movie={movie} />}
          />
          <Route />
          <Redirect to={`/movie/${movieId}/details`} />
        </Switch>
      </TabPane>
    </div>
  );
}

export default MoviePage;
