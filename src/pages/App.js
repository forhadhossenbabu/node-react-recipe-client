import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from "../utils/protected-route.hoc";

import Signin from "./signin.page";
import Signup from "./signup.page";
import Home from "./home.page";
import Dashbord from "./dashbord.page";
import CreateRecipe from "./createRecipe.page";
import EditRecipe from "./edit-recipe.page";

import "./main.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route component={Signin} exact path="/signin" />
      <Route component={Signup} exact path="/signup" />
      <Route component={Home} exact path="/" />
      <ProtectedRoute component={Dashbord} exact path="/app" />
      <ProtectedRoute
        component={CreateRecipe}
        exact
        path="/app/create-recipe"
      />
      <ProtectedRoute
        exact
        path="/app/edit-recipe/:id"
        component={EditRecipe}
      />
      <Route component={() => "404 NOT FOUND"} path="*" />
    </Switch>
  </BrowserRouter>
);

export default App;
