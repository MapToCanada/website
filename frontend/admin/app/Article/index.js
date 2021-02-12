import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import * as urls from "@admin/constant/menu_urls.js";

// Page Layout
import { Layout, Menu } from "antd";
import { OrderedListOutlined, PlusOutlined } from "@ant-design/icons";
const { Content, Sider } = Layout;

// Sub pages
import List from "./List"; 

const home = () => {
  return (
  <Layout>
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<OrderedListOutlined />}>
          <Link to={urls.ARTICLE_LIST}>Article List</Link>
        </Menu.Item>
        <Menu.Item key="sub3" icon={<PlusOutlined />}>
          <Link to={urls.ARTICLE_NEW}>New Article</Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
          <Switch>
            <Route exact path={urls.ARTICLE_LIST} render={() => <List />} />
            <Route exact path={urls.ARTICLE_NEW} render={() => <div>Add</div>} />
          </Switch>
      </Content>
    </Layout>
  </Layout>);
};

export default home;
