import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

// UI
import { Button, Modal, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CategoryForm from "./CategoryForm";

// Reducers
import { createCategory, startCreating, endCreating, fetchCategories } from "@admin/store/reducers/category";

const CategoryAdd = () => {
  const [form] = Form.useForm();

  const { creating, status, time, visible } = useSelector((state) => ({
    creating: state.entity.category.creating,
    status: state.entity.category.creatingStatus,
    time: state.entity.category.time,
    visible: state.entity.category.showCreatingForm,
  }));

  useEffect(() => {
    switch (status) {
      case "success":
        form.resetFields();
        dispatch(fetchCategories())
        message.success("Category created");
        break;
      case "error":
        message.error("Category not created. (error time: " + moment(time).format("hh:mm:ss") + ")")
        break;
      default:
        return;
    }
  }, [status]);

  const dispatch = useDispatch();

  function handleOk() {
    form.submit();
  }

  function handleFinish(values) {
    dispatch(createCategory(values));
  }

  function handleOpenModal(){
    dispatch({ type: startCreating.type })
  }

  return (
    <div>
      {/* Modal */}
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={() => dispatch({ type: endCreating.type })}
        okButtonProps={{
          disabled: creating === true ? true : false,
          loading: creating === true ? true : false,
        }}
        cancelButtonProps={{
          disabled: creating === true ? true : false,
          loading: creating === true ? true : false,
        }}
      >
        <CategoryForm form={form} onFinish={handleFinish} />
      </Modal>

      {/* Button */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleOpenModal()}
      >
        New Category
      </Button>
    </div>
  );
};

export default CategoryAdd;
