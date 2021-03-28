import React from "react";
import { connect } from "react-redux";
// import { API_IMAGE } from "@portal/constant/apis";
import { get } from "@portal/store/reducers/archive";

import { Spin } from "antd";
import styles from "./index.less";

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStatus: -1
    };
  }

  componentDidMount = () => {
    const { match } = this.props;

    if(!match && !match.params && !match.params.code && !match.params.code.length > 3){
      this.setState({pageStatus: 404});
      return;
    }

    const code = match.params.code;
    this.props.getArchive(code);


    console.log(code);
  }

  render() {
    const { match, archive, loading } = this.props;
    return <div className={styles.archive}>
      <div>{match && match.params && match.params.code}</div>
      {loading && <Spin />}

      <h2>{archive && archive.title}</h2>
      <div>{archive && archive.content}</div>
    </div>;
  }
}

const mapState = (state) => ({
  loading: state.archive.loading,
  status: state.archive.status,
  archive: state.archive.archive
})

const mapDispatch = (dispatch) => ({
  getArchive: (id) => dispatch(get(id)),
})

export default connect(mapState, mapDispatch)(index);
