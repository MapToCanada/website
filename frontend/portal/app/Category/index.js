import React from "react";

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match } = this.props
    return <div>
      {match && match.params && match.params.code}
    </div>;
  }
}

export default index;
