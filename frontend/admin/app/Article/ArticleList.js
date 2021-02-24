import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Constant
import * as urls from "@admin/constant/menu_urls";

// UI
import { List, Space, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
    };
  }

  componentDidMount() {
    this.props.fetch({ page: 1, pageSize });
  }

  delete = async (id) => {
    this.setState({ loading: true });
    const result = await del(id);
    this.setState({ loading: false });
    if (result !== false) message.success("Archive deleted!");
    this.props.fetch({ page: 1, pageSize });
  };

  render() {
    const { loading, archives, fetch } = this.props;

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
              fetch({ page, pageSize });
              this.setState({ page });
            },
            pageSize,
          }}
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <Link to={urls.ARTICLE_EDIT_INSTANCE(item.id)} key={"edit-link-" + item.id}>
                  <IconText
                    icon={EditOutlined}
                    text="Edit"
                    key="list-vertical-like-o"
                  />
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
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
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
              {item.content}
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
