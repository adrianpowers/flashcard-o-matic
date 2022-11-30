import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import EditCard from "../Card/EditCard";
import AddCard from "../Card/AddCard";

export default function CardSwitch() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/cards/:cardId/edit`}>
        <EditCard />
      </Route>
      <Route path={`${path}/cards/new`}>
        <AddCard />
      </Route>
    </Switch>
  );
}
