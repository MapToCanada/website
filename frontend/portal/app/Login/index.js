import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { login } from "@portal/store/reducers/login";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFinish = (values) => {
    this.props.login(values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your E-mail!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login.user,
  status: state.login.status,
  time: state.login.time,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
