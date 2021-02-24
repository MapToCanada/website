import React from "react";
import { connect } from "react-redux";

// Constant
import * as urls from "@admin/constant/menu_urls";

// UI and Form
import { message } from "antd";
import ArticleForm from "./ArticleForm";

// Reducer
import { create } from "@admin/store/reducers/archive";

class ArticleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleFinish = (values) => {
    this.props.create(values);
  }

  componentDidUpdate = () => {
    if(!this.props.message) return;
    const result = this.props.message;
    if(result.status == 0 || result.aid < 0){
      message.error("Archive already exists. (Error: same title)");
    }
    message.success("Article Created");
    this.props.history.push(urls.ARTICLE_EDIT_INSTANCE(result.aid))
  }

  render() {
    return (
      <div>
        <ArticleForm onFinish={this.handleFinish} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.entity.archive.detailStatus,
  message: state.entity.archive.message,
});

const mapDispatchToProps = (dispatch) => ({
  create: (payload) => dispatch(create(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleAdd);
