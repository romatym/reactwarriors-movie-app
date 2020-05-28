import React from "react";
import MovieVideo from "./MovieVideo";
import MovieCast from "./MovieCast";

import {
  Route,
  NavLink as NavLinkRouter,
  Redirect,
  Switch,
} from "react-router-dom";
import { TabPane, Nav, NavItem, NavLink } from "reactstrap";

function MovieTabs(props) {
  const { movieId } = props;

  return (
    <div className="top-indent">
      <Nav tabs>

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
          <Redirect to={`/movie/${movieId}/cast`} />
        </Switch>
      </TabPane>
    </div>
  );
}

export default MovieTabs;
