import React, { useState, useEffect } from "react";
import { Form, Input, Radio } from "antd";

const CategoryForm = ({form, onFinish, initialValues}) => {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
    form.setFieldsValue(initialValues); // Updated initial values for antd form
  }, [initialValues]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={values}
      >
        <Form.Item
          name="title_cn"
          label="Chinese Title"
          required
          tooltip="This is a required field"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title_en"
          label="English title"
          required
          tooltip="This is a required field"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="code"
          label="Link code"
          required
          tooltip="This is a required field"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Publish" name="is_pub">
          <Radio.Group>
            <Radio.Button value={true}>Yes</Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryForm;
