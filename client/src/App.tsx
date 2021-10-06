import React from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/User/Dashboard";
import UserOrder from "./pages/User/Orders";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminOrder from "./pages/Admin/Orders";
import AdminLogin from "./components/Admin/Login";
import AdminSignup from "./components/Admin/Signup";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import { AuthProvider } from "./userContext/context";
import { useAuth } from "./userContext/context";
function App() {
  const { loggedIn } = useAuth();
  if (loggedIn === false)
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/admin/signup" component={AdminSignup} />
          <Route path="/admin/login" component={AdminLogin} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/dashboard">
            <UserDashboard />
          </Route>

          <Route path="/myorders">
            <UserOrder />
          </Route>
        </Switch>

        <Switch>
          <Route path="/admin/dashboard">
            <AdminDashboard />
          </Route>

          <Route path="/admin/login">
            <AdminLogin />
          </Route>

          <Route path="/admin/signup">
            <AdminSignup />
          </Route>

          <Route path="/admin/myorders">
            <AdminOrder />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
