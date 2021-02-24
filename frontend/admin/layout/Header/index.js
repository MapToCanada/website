import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import * as urls from "@admin/constant/menu_urls.js";
import styles from "./index.less";

const index = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <div className={styles.logo} />
      <Menu
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={[current]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="Dashboard">
          <Link to={urls.HOME}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="Article">
          <Link to={urls.ARTICLE}>Article</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default index;
