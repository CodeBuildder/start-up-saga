import React from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/User/Dashboard";
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
      <Switch>
        <Route path="/dashboard">
          <UserDashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
