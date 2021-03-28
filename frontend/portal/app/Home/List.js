import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Spin } from "antd";
import styles from "./list.less";
import { Link } from "react-router-dom";

import * as urls from "@portal/constant/menu_urls.js";
import { fetch } from "@portal/store/reducers/archive";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.fetchArchives({ page: 1, pageSize: 5 });
  };

  render() {
    const { archives, loading } = this.props;

    if (loading) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      );
    }

    return (
      <div className={styles.article}>
        {archives &&
          archives.results &&
          archives.results.map((item) => (
            <Row key={"news-" + item.id}>
              <Col span={24} xs={24} sm={24}>
                <h2><Link to={urls.ARCHIVE_ENTITY(item.link)}>{item.title}</Link></h2>
                <p>{item.description}</p>
              </Col>
            </Row>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.archive.loading,
  archives: state.archive.archives,
});

const mapDispatchToProps = (dispatch) => ({
  fetchArchives: (payload) => dispatch(fetch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
