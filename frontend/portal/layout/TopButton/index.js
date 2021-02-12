import React from "react";
import styles from "./index.less";

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
  }

  componentDidMount = () => {
    let scrollFunction = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        this.setState({ hidden: false });
      } else {
        this.setState({ hidden: true });
      }
    }

    window.onscroll = () => {
      scrollFunction();
    };
  }

  goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  render() {
    const { hidden } = this.state;
    return (
      <button
        onClick={this.goToTop}
        title="Go to top"
        className={styles.topBtn}
        style={{ display: hidden ? "none" : "block" }}
      >
        Top
      </button>
    );
  }
}

export default index;
