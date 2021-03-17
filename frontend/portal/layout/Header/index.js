import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { Menu } from "antd";
import * as urls from "@portal/constant/menu_urls.js";

import { fetch } from "@portal/store/reducers/category";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  componentDidMount = () => {
    this.props.fetch({pageSize: 5});
  };

  render() {
    const { current } = this.state;
    const { login, categories } = this.props;

    const menuStyle = {
      border: "none",
      width: "100%",
      background: "transparent",
    };

    return (
      <div>
        <div>
          <Menu
            onClick={(e) => this.setState({ current: e.key })}
            selectedKeys={[current]}
            mode="horizontal"
            style={menuStyle}
          >
            <Menu.Item key="home">
              <Link to={urls.HOME}>Map To Canada</Link>
            </Menu.Item>
            {categories && categories.results && 
              categories.results.map((item) => (
                <Menu.Item key={"menu_" + item.id}>
                  <Link to={urls.CATEGORY_ENTITY(item.code)}>{item.title_cn}</Link>
                </Menu.Item>
              ))
            }
            {login.loggedIn && (
              <Menu.Item key="profile">
                <Link to={urls.PROFILE}>Profile</Link>
              </Menu.Item>
            )}
            {login.loggedIn && (
              <Menu.Item key="signout">
                <Link to={urls.SIGN_OUT}>Sign out</Link>
              </Menu.Item>
            )}
            {!login.loggedIn && (
              <Menu.Item key="signin">
                <Link to={urls.SIGN_IN}>Sign In</Link>
              </Menu.Item>
            )}
            {login.isStaff && (
              <Menu.Item key="admin">
                <a href={urls.ADMIN}>Admin</a>
              </Menu.Item>
            )}
          </Menu>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  login: state.login,
  categories: state.category.categories,
  loading: state.category.loading,
});

const mapDispatch = (dispatch) => ({
  fetch: (data) => dispatch(fetch(data))
})

export default connect(mapState, mapDispatch)(Header);
