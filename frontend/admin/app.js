import "antd/dist/antd.less";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { authToken } from "@portal/store/reducers/login";
import * as urls from "@admin/constant/menu_urls.js";

// Layout
import { Layout, Spin } from "antd";
import AdminHeader from "./layout/Header";
import TopButton from "./layout/TopButton";
import styles from "./index.less";

// Pages
import AdminHome from "./app/Home";
import Article from "./app/Article";

const { Header, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authToken()
  }

  render() {
    if(this.props.loading !== false){
      return (
        <div className={styles.appLoading}>
          <div className={styles.spin}><Spin /></div>
        </div>
      )
    }

    if(this.props.loggedIn === false && this.props.isStaff === false){
      window.location.href = urls.PORTAL;
    }

    return (
      <Layout>
        <BrowserRouter>
          <Header className="header">
            <AdminHeader />
          </Header>
          <Layout>
          <Content className={styles.siteLayoutContent}>
            <Switch>
              <Route exact path={urls.HOME} render={(p) => <AdminHome {...p} />} />
              <Route path={urls.ARTICLE} render={(p) => <Article {...p} />} />
            </Switch>
          </Content>
          </Layout>
        </BrowserRouter>
        <TopButton />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  loggedIn: state.login.loggedIn,
  isStaff: state.login.isStaff,
  time: state.login.time,
});

const mapDispatchToProps = (dispatch) => ({
  authToken: (payload) => dispatch(authToken(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
