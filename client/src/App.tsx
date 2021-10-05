import React from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/User/Dashboard";
import UserOrder from "./pages/User/Orders";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminOrder from "./pages/Admin/Orders";
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
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      <Switch>
        <Route path="/dashboard">
          <UserDashboard />
        </Route>
      </Switch>
      <Switch>
        <Route path="/myorders">
          <UserOrder />
        </Route>
      </Switch>
      <Switch>
        <Route path="/admin/dashboard">
          <AdminDashboard />
        </Route>
      </Switch>
      <Switch>
        <Route path="/admin/myorders">
          <AdminOrder />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
