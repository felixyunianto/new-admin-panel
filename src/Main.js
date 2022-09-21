import React, { useState, useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearMessage } from "./Redux/actions/message";
import { history } from "./Redux/helpers/history";

import HeaderComponent from "./Components/Layouts/Partials/Header/";
import SidebarComponent from "./Components/Layouts/Partials/Sidebar/";

import DashboardPage from "./Pages/Dashboard/";
import SquadPage from "./Pages/Squad/";
import DetailSquadPage from "./Pages/Squad/DetailSquad";

import TheoryPage from "./Pages/Theory/";
import CreateNewDataTheory from "./Components/Theory/CreateNewData";
import DetailTheoryPages from "./Pages/Theory/DetailTheory";
import UpdateDataTheoryPage from "./Pages/Theory/UpdateDataTheoryPage";

import CreateNewTaskPage from "./Pages/Task/CreateNewTask";
import InputGradePage from "./Pages/Grade/InputGrade";

import BatchPage from "./Pages/Batch";

import UserPage from "./Pages/Users/";
import CreateNewDataUserPage from "./Pages/Users/CreateNewDataUser";
import DetailUserPage from "./Pages/Users/DetailUser";
import EditUserPage from "./Pages/Users/EditUser";

import CategoryEventPage from "./Pages/CategoryEvent";

import EventPage from "./Pages/Event/";
import CreateNewDataEventPage from "./Pages/Event/CreateNewDataEvent";
import EditEventPage from "./Pages/Event/EditEvent";
import DetailEventPage from "./Pages/Event/DetailEvent";
import OprecPage from './Pages/Event/Oprec'

import CashPage from "./Pages/Cash/index2";

import ShowMemberCashPage from "./Pages/Cash/ShowMemberCashPage";

import MoneyPage from "./Pages/Money/";
import CreateNewDataMoneyPage from "./Pages/Money/CreateNewDataMoney";
import EditDataMoneyPage from "./Pages/Money/EditMoneyData";

import LoginPage from "./Pages/Auth/Login/";
import ForbiddenPages from "./Pages/Forbidden/";
import ProfilePage from "./Pages/Profile";

const Main = (props) => {
  console.log("Main Props ", props);
  const [toggleState, setToggleState] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          currentUser !== null && currentUser.roles === "Admin" ? (
            <Component {...props} />
          ) : currentUser !== null && currentUser.roles !== "Admin" ? (
            <Redirect to={{ pathname: "/forbidden" }} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  };

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          currentUser !== null ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  };

  return (
    <Router history={history}>
      <div className="" style={{ background: "#F7F8FC" }}>
        {currentUser && (
          <HeaderComponent
            toggle={toggleState}
            toggleChange={(value) => setToggleState(value)}
          />
        )}
        {currentUser && <SidebarComponent toggle={toggleState} />}
        <Switch>
          <Fragment>
            <Route exact path={"/login"} component={LoginPage} />
            <div
              className={
                (toggleState === false ? "ml-60" : "ml-20") +
                " overflow-hidden pt-16 pb-14 h-auto"
              }
            >
              <PrivateRoute exact path="/" component={DashboardPage} />
              <AdminRoute exact path="/squad" component={SquadPage} />
              <AdminRoute
                exact
                path="/squad/:name"
                component={DetailSquadPage}
              />
              <PrivateRoute exact path="/theory" component={TheoryPage} />
              <PrivateRoute
                exact
                path="/theory/create"
                component={CreateNewDataTheory}
              />
              <PrivateRoute
                path="/theory/edit/pertemuan-ke-:name"
                component={UpdateDataTheoryPage}
              />
              <PrivateRoute
                path="/theory/pertemuan-ke-:name"
                component={DetailTheoryPages}
              />
              <PrivateRoute path="/task-create" component={CreateNewTaskPage} />
              <PrivateRoute path="/input-grade" component={InputGradePage} />

              <AdminRoute path="/batch" component={BatchPage} />

              <PrivateRoute
                path="/category-event"
                component={CategoryEventPage}
              />

              <PrivateRoute path="/event" component={EventPage} />
              <PrivateRoute
                path="/event-create"
                component={CreateNewDataEventPage}
              />
              <PrivateRoute path="/event-edit" component={EditEventPage} />
              <PrivateRoute path="/event-detail" component={DetailEventPage} />
              <PrivateRoute path="/oprec" component={OprecPage} />

              <AdminRoute path="/user" component={UserPage} />

              <AdminRoute path="/user-detail" component={DetailUserPage} />

              <AdminRoute
                path="/user-create"
                component={CreateNewDataUserPage}
              />

              <AdminRoute path="/user-edit" component={EditUserPage} />

              <PrivateRoute path="/cash" component={CashPage} />

              <PrivateRoute
                path="/list-member-cash"
                component={ShowMemberCashPage}
              />

              <PrivateRoute path="/money" component={MoneyPage} />
              <PrivateRoute
                path="/money-create"
                component={CreateNewDataMoneyPage}
              />
              <PrivateRoute path="/money-edit" component={EditDataMoneyPage} />

              <PrivateRoute path="/profile" component={ProfilePage} />

              <Route path="/forbidden" component={ForbiddenPages} />
            </div>
          </Fragment>
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
