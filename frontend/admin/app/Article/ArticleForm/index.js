import React from "react";
import { connect } from "react-redux";
import moment from "moment";

// Antd UI
import {
  Form,
  Input,
  Select,
  Radio,
  Switch,
  DatePicker,
  Button,
  Divider,
} from "antd";
const { Option } = Select;

import ThumbnailUploader from "./Thumbnail";

// Reducers
import { fetchCategories } from "@admin/store/reducers/category";

// Style
import styles from "./index.less";

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      thumbnail: null,
    };
    this.form = React.createRef();
  }

  componentDidMount = () => {
    const { initialValues, fetchCategories } = this.props;

    fetchCategories({ pageSize: 50 });

    let formData = {}
    if (initialValues == null) {
      // Create new archive
      formData = {
        language: "zh-hans",
        ts_publish: moment(),
        is_publish: true,
        home_push: true,
      }
    }else{
      // Edit exists archive
      formData = {
        ...initialValues,
        ts_publish: moment(initialValues["ts_publish"]),
        category: initialValues["category"].map((c) => c.id),
      };
    }
    this.form.current.setFieldsValue(formData);
    let state = { data: formData };
    if(initialValues && initialValues.thumb !== null){
      state["thumbnail"] = initialValues.thumb;
    }
    this.setState(state);
  };
  
  setThumbnail = (image) => {
    this.setState({thumbnail: image});
  }

  handleFinish = (values) => {
    const { onFinish } = this.props;
    if(this.state.thumbnail !== null){
      values.thumb = this.state.thumbnail;
    }
    onFinish(values);
  }

  render() {
    const { loading, categories } = this.props;

    return (
      <div>
        <Form ref={this.form} layout="vertical" onFinish={this.handleFinish}>
          <Form.Item label="Language" name="language">
            <Radio.Group>
              <Radio value="en-us">English</Radio>
              <Radio value="zh-hans">简体中文</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Link" name="link">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Content" name="content">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Publish" name="is_publish" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Publish datetime" name="ts_publish">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="Home push" name="home_push" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select
              placeholder="Please select a category"
              mode="multiple"
              loading={loading}
              allowClear
            >
              {categories &&
                categories.results &&
                categories.results.length > 0 &&
                categories.results.map((item) => (
                  <Option value={item.id} key={"category_" + item.id}>
                    {item.title_cn}({item.title_en})
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <div className={styles.thumbItem}>
            <div>Thumbnail</div>
            <div><ThumbnailUploader defaultValue={this.state.thumbnail} onThumbnailChanged={this.setThumbnail} /></div>
          </div>
          <Divider dashed />
          <Form.Item>
            <Button type="primary" htmlType="submit" {...this.props.submitButtonProps}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.entity.category.loading,
  time: state.entity.category.time,
  status: state.entity.category.status,
  categories: state.entity.category.categories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: (payload) => dispatch(fetchCategories(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
