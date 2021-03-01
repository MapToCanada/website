import React from "react";

// Constant
import { ARTICLE_EDIT_INSTANCE } from "@admin/constant/menu_urls";

// UI and Form
import { message } from "antd";
import ArticleForm from "./ArticleForm";

import { create } from "./ajax";

class ArticleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  handleFinish = async (values) => {
    this.setState({ loading: true });
    const result = await create(values);
    this.setState({ loading: false });

    if (result.status == 0 || result.aid < 0) {
      message.error("Archive already exists. (Error: same title)");
      return;
    }
    message.success("Article Created");
    this.props.history.push(ARTICLE_EDIT_INSTANCE(result.aid));
  };

  render() {
    return (
      <div>
        <ArticleForm
          onFinish={this.handleFinish}
          submitButtonProps={{
            loading: this.state.loading,
            disabled: this.state.loading,
          }}
        />
      </div>
    );
  }
}

export default ArticleAdd;
