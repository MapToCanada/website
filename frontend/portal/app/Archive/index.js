import React from "react";
import { connect } from "react-redux";
// import { API_IMAGE } from "@portal/constant/apis";
import { get } from "@portal/store/reducers/archive";

const ReactMarkdown = require("react-markdown");
const gfm = require("remark-gfm");
import moment from "moment";

import { Skeleton, Divider } from "antd";
import styles from "./index.less";

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStatus: -1,
    };
  }

  componentDidMount = () => {
    const { match } = this.props;

    if (
      !match &&
      !match.params &&
      !match.params.code &&
      !match.params.code.length > 3
    ) {
      this.setState({ pageStatus: 404 });
      return;
    }

    const code = match.params.code;
    this.props.getArchive(code);
  };

  render() {
    const { archive, loading } = this.props;
    return (
      <div className={styles.archive}>
        <h1 className={styles.container}>
          {loading && <Skeleton.Input style={{ width: 200 }} active />}
          {archive && archive.title}
        </h1>
        <div className={[styles.content, styles.container].join(" ")}>
          {loading && <Skeleton active />}

          {archive && (<div>
            <div>{archive.ts_publish && moment(archive.ts_publish).format("MMMM Do YYYY")}</div>
            <Divider dashed />
            
            <ReactMarkdown plugins={[gfm]}>
              {archive.content}
            </ReactMarkdown>
          </div>)}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  loading: state.archive.loading,
  status: state.archive.status,
  archive: state.archive.archive,
});

const mapDispatch = (dispatch) => ({
  getArchive: (id) => dispatch(get(id)),
});

export default connect(mapState, mapDispatch)(index);
