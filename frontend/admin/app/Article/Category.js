import React from "react";
import { connect } from "react-redux";

// Reducers
import { fetchCategories, deleteCategory, edit } from "@admin/store/reducers/category";

// UI
import { Table, Space, Popconfirm } from "antd";
import CategoryAdd from "./CategoryAdd";
import CategoryEdit from "./CategoryEdit";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,
      categories: []
    };
    this.success = false;
  }

  componentDidMount = () => {
    const { page, pageSize } = this.state;
    this.props.fetchCategories({page, pageSize});
  };

  componentDidUpdate = () => {
    if(this.success == true){
      this.success = false;
      return;
    }

    if(this.props.deletingStatus === "success" && this.props.deleting === false){
      const { page, pageSize } = this.state;
      this.props.fetchCategories({page, pageSize});
      this.success = true;
    }
  }

  edit = (id) => {
    this.props.edit(id);
  };

  delete = (id) => {
    this.props.deleteCategory(id);
  };

  render() {
    const { loading, deleting, categories } = this.props;
    const dataSource = categories.results;
    const { page, pageSize } = this.state;

    const columns = [
      {
        title: "Title(Chinese)",
        dataIndex: "title_cn",
        key: "title_cn",
      },
      {
        title: "Title(English)",
        dataIndex: "title_en",
        key: "title_en",
      },
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Publish",
        key: "is_pub",
        render: (record) => <span>{record.is_pub ? "True" : "False"}</span>,
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <Space size="middle">
            <a onClick={() => this.edit(record.id)}>Edit</a>
            <Popconfirm
              title="Are you sure to delete this category?"
              onConfirm={() => this.delete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    return (
      <div>
        <CategoryAdd />
        <CategoryEdit />
        
        {/* List */}
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          loading={loading === true || deleting === true}
          pagination={{
            position: "bottom",
            defaultPageSize: pageSize,
            total: categories.count,
            current: page,
            onChange: (currentPage, currentPageSize) => {
              this.setState({page: currentPage});
              this.props.fetchCategories({ page, currentPageSize });
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // status
  loading: state.entity.category.loading,
  time: state.entity.category.time,
  status: state.entity.category.status,

  // entities
  categories: state.entity.category.categories,

  // delete
  deleting: state.entity.category.deleting,
  deletingStatus: state.entity.category.deletingStatus,
  showEditingForm: state.entity.category.showEditingForm,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: (payload) => dispatch(fetchCategories(payload)),
  deleteCategory: (payload) => dispatch(deleteCategory(payload)),
  edit: (payload) => dispatch(edit(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
