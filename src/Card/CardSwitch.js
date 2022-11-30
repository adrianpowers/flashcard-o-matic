import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import EditCard from "../Card/EditCard";
import AddCard from "../Card/AddCard";

export default function CardSwitch({deck}) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:cardId/edit`}>
        <EditCard deck={deck}/>
      </Route>
      <Route path={`${path}/new`}>
        <AddCard deck={deck}/>
      </Route>
    </Switch>
  );
}
