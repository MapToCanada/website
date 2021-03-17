import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "antd/dist/antd.less";
import * as urls from "@portal/constant/menu_urls.js";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import TopButton from "./layout/TopButton";

import Home from "./app/Home";
import SignIn from "./app/Login";
import About from "./app/About";
import Category from "./app/Category";

import { authToken } from "@portal/store/reducers/login";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authToken()
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path={urls.HOME} render={(p) => <Home {...p} />} />
          <Route exact path={urls.SIGN_IN} render={(p) => <SignIn {...p} />} />
          <Route exact path={urls.ABOUT} render={(p) => <About {...p} />} />
          <Route exact path={urls.CATEGORY} render={(p) => <Category {...p} />} />
        </Switch>
        <Footer />
        <TopButton />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login.user,
  status: state.login.status,
  time: state.login.time,
});

const mapDispatchToProps = (dispatch) => ({
  authToken: (payload) => dispatch(authToken(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

