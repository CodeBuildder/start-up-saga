import React from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
