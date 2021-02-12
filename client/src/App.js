import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar2 from "./components/layout/NavBar2";
import { loadUser } from "./redux/actions/auth";
import setAuthToken from "./redux/utils/setAuthToken";
import Landing from "./components/layout/Landing";
import Scroll from "./components/layout/Scroll";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Alerts from "./components/layout/Alerts";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <NavBar2 />
      <section className="container">
        <Route exact path="/" component={Landing} />
        <Box>
          <Alerts />
        </Box>
        <Switch>
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Scroll />
      </section>
    </Router>
  );
};
export default App;
