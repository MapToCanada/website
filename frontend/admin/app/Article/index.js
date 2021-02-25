import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import * as urls from "@admin/constant/menu_urls.js";

// Page Layout
import { Layout, Menu } from "antd";
import {
  OrderedListOutlined,
  PlusOutlined,
  AppstoreOutlined,
  RestOutlined,
} from "@ant-design/icons";
const { Content, Sider } = Layout;

// Sub pages
import List from "./ArticleList";
import ArticleAdd from "./ArticleAdd";
import ArticleEdit from "./ArticleEdit";
import Category from "./Category";

const home = () => {
  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
          <Menu.Item key="articleList" icon={<OrderedListOutlined />}>
            <Link to={urls.ARTICLE_LIST}>Article List</Link>
          </Menu.Item>
          <Menu.Item key="newArticle" icon={<PlusOutlined />}>
            <Link to={urls.ARTICLE_NEW}>New Article</Link>
          </Menu.Item>
          <Menu.Item key="category" icon={<AppstoreOutlined />}>
            <Link to={urls.CATEGORY}>Category</Link>
          </Menu.Item>
          <Menu.Item key="trash" icon={<RestOutlined />}>
            <Link to={urls.ARTICLE_TRASH}>Trash</Link>
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
            <Route exact path={urls.ARTICLE_TRASH} render={(props) => <List {...props} type="trash" />} />
            <Route exact path={urls.ARTICLE_NEW} render={(props) => <ArticleAdd {...props} />}/>
            <Route exact path={urls.CATEGORY} render={() => <Category />} />
            <Route exact path={urls.ARTICLE_EDIT} render={(props) => (<ArticleEdit {...props} />)}
            />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default home;
