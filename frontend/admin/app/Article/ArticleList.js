import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Constant
import * as urls from "@admin/constant/menu_urls";
import { API_IMAGE } from "@admin/constant/apis";

// UI
import { List, Space, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  RetweetOutlined,
} from "@ant-design/icons";

// Reducer
import { fetch } from "@admin/store/reducers/archive";
import { del } from "./ajax";

// UI
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

// const page = 1;
const pageSize = 5;

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false,
      type: null,
    };
  }

  componentDidMount() {
    this.props.fetch({ page: 1, pageSize });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.type != prevProps.type) {
      const type = this.props.type == "trash" ? "trash" : null;
      this.props.fetch({ page: 1, pageSize, type });
      this.setState({ type });
    }
  };

  delete = async (id) => {
    const { type } = this.state;
    this.setState({ loading: true });
    const result = await del(id, { type });
    this.setState({ loading: false });
    if (result !== false) message.success("Archive deleted!");
    this.props.fetch({ page: 1, pageSize, type });
  };

  putBack = async (id) => {
    console.log(id);
  };

  itemActions = (item) => {
    if (this.props.type && this.props.type == "trash") {
      return [
        <Popconfirm
          title="Are you sure to put this archive back?"
          onConfirm={() => this.putBack(item.id)}
          okText="Yes"
          cancelText="No"
          key={"list-put-back-button-" + item.id}
        >
          <IconText
            icon={RetweetOutlined}
            text="Put back"
            key="list-vertical-star-o"
          />
        </Popconfirm>,
        <Popconfirm
          title="Are you sure to delete this archive as Permanent?"
          onConfirm={() => this.delete(item.id)}
          okText="Yes"
          cancelText="No"
          key={"list-delete-button-" + item.id}
        >
          <a href="#">
            <IconText
              icon={DeleteOutlined}
              text="Delete Permanent"
              key="list-vertical-star-o"
            />
          </a>
        </Popconfirm>,
      ];
    }

    return [
      <Link
        to={urls.ARTICLE_EDIT_INSTANCE(item.id)}
        key={"edit-link-" + item.id}
      >
        <IconText icon={EditOutlined} text="Edit" key="list-vertical-like-o" />
      </Link>,
      <Popconfirm
        title="Are you sure to delete this archive?"
        onConfirm={() => this.delete(item.id)}
        okText="Yes"
        cancelText="No"
        key={"list-delete-button-" + item.id}
      >
        <a href="#">
          <IconText
            icon={DeleteOutlined}
            text="Delete"
            key="list-vertical-star-o"
          />
        </a>
      </Popconfirm>,
    ];
  };

  render() {
    const { loading, archives, fetch } = this.props;
    const { type } = this.state;

    const dataSource =
      archives && archives.results && archives.results.length > 0
        ? archives.results
        : [];

    return (
      <div>
        <List
          itemLayout="vertical"
          size="small"
          loading={loading || this.state.loading}
          pagination={{
            total: archives && archives.count,
            onChange: (page) => {
              fetch({ page, pageSize, type });
              this.setState({ page });
            },
            pageSize,
          }}
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={this.itemActions(item)}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={
                    (item.thumb == null &&
                      "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png") ||
                    API_IMAGE(item.thumb, 270, 160)
                  }
                />
              }
            >
              <List.Item.Meta
                title={
                  <Link to={urls.ARTICLE_EDIT_INSTANCE(item.id)}>
                    {item.title}
                  </Link>
                }
              />
              {item.description}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.entity.archive.loading,
  status: state.entity.archive.status,
  archives: state.entity.archive.archives,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: (payload) => dispatch(fetch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
