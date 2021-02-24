import React from "react";
import { connect } from "react-redux";

// UI
import { Spin, message } from "antd";
import ArticleForm from "./ArticleForm";

// Reducer
import { get, reset } from "@admin/store/reducers/archive";
import { edit } from "./ajax";

class ArticleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      loading: false
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.get(id);
    this.setState({ id });
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  handleFinish = async (values) => {
    this.setState({"loading": true});
    const result = await edit(this.state.id, values)
    this.setState({"loading": false});
    if(result && result.status > 0){
      message.success("Archive saved.");
    }
  };

  render() {
    const { archive, loading } = this.props;
    const { id } = this.state;

    if (loading || archive == null || archive.id != id) {
      return (
        <div>
          <Spin />
        </div>
      );
    }

    return (
      <div>
        <h2>Edit</h2>
        <ArticleForm
          formRef={this.form}
          onFinish={this.handleFinish}
          initialValues={archive}
          submitButtonProps={{loading: this.state.loading, disabled: this.state.loading}}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  archive: state.entity.archive.archive,
  status: state.entity.archive.detailStatus,
  loading: state.entity.archive.loadingDetail,
});

const mapDispatchToProps = (dispatch) => ({
  get: (payload) => dispatch(get(payload)),
  reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
