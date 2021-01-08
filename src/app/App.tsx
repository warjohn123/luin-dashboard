import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import "./styles/custom-antd/custom.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LuinLoginPage } from "./pages/login/login.page";
import { LuinAdminGuard } from "./components/guards/admin.guard";
import Axios from "axios";
import { LuinToken } from "./api/token.api";
import { LuinApplication } from "./api/application.api";
import { LuinSignupPage } from "./pages/signup/signup.page";

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

Axios.defaults.headers.common = {
  "x-api-key": new LuinApplication().getCurrentAppIdFromPath(),
  "Content-Type": "application/json",
  Authorization: `Bearer ${new LuinToken().getAccessToken()}`,
};

function App() {
  console.log(process.env);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LuinLoginPage></LuinLoginPage>
        </Route>
        <Route path="/signup">
          <LuinSignupPage></LuinSignupPage>
        </Route>
        <Route path="/">
          <LuinAdminGuard></LuinAdminGuard>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
