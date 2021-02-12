import React from "react";
import { Row, Col } from "antd";
import styles from "./list.less";

const list = () => {
  return (
    <div className={styles.article}>
      <Row>
        <Col span={6} xs={24} sm={6}>
          <div className={styles.thumb}>
            <img src="https://www.freeyeti.net/static/images/antarctic_map.jpg" />
          </div>
        </Col>
        <Col span={18} xs={24} sm={18}>
          <h2>Title 1</h2>
          <p>
            Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS-
            and JavaScript-based design templates for typography, forms,
            buttons, navigation, and other interface components
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={6} xs={24} sm={6}>
          <div className={styles.thumb}>
            <img src="https://www.freeyeti.net/static/images/antarctic_map.jpg" />
          </div>
        </Col>
        <Col span={18} xs={24} sm={18}>
          <h2>Title 2</h2>
          <p>
            Bootstrap is a free and open-source CSS framework directed at
            responsive, mobile-first front-end web development. It contains CSS-
            and JavaScript-based design templates for typography, forms,
            buttons, navigation, and other interface components
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default list;
