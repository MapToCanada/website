import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import * as urls from "@portal/constant/menu_urls.js";
import { useSelector } from "react-redux";

const index = () => {
  const { login } = useSelector(state => ({
    login: state.login,
  }));

  useEffect(() => {
    if (!login.loggedIn && sessionStorage.getItem("token") != null) {
      console.log("logedin");
    }
  });

  const [current, setCurrent] = useState(0);

  return (
    <div>
      <Menu
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="Logo">
          <Link to={urls.HOME}>Map To Canada</Link>
        </Menu.Item>
        <Menu.Item key="home">
          <Link to={urls.HOME}>首页</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to={urls.ABOUT}>关于</Link>
        </Menu.Item>
        <Menu.Item key="faq">
          <Link to={urls.ABOUT}>FAQ</Link>
        </Menu.Item>
        { login.loggedIn && 
          <Menu.Item key="profile">
            <Link to={urls.PROFILE}>Profile</Link>
          </Menu.Item>}
        { login.loggedIn && 
          <Menu.Item key="signout">
            <Link to={urls.SIGN_OUT}>Sign out</Link>
          </Menu.Item>}
        { !login.loggedIn && <Menu.Item key="signin">
          <Link to={urls.SIGN_IN}>Sign In</Link>
        </Menu.Item> }
        { login.isStaff && <Menu.Item key="admin">
          <a href={urls.ADMIN}>Admin</a>
        </Menu.Item> }
      </Menu>
    </div>
  );
};

export default index;
