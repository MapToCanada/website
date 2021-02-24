import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// UI
import { Modal, Form, message, Spin } from "antd";
import CategoryForm from "./CategoryForm";

// Reducers
import {
  updateCategory,
  endEditing,
  fetchCategories,
  getCategory,
} from "@admin/store/reducers/category";

const CategoryEdit = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const {
    startEditing,
    currentId,
    currentValues,
    editing,
    editingStatus,
    time,
    visible,
  } = useSelector((state) => ({
    startEditing: state.entity.category.startEditing,
    currentId: state.entity.category.currentId,
    currentValues: state.entity.category.currentValues,
    editing: state.entity.category.editing,
    editingStatus: state.entity.category.editingStatus,
    time: state.entity.category.time,
    visible: state.entity.category.showEditingForm,
  }));

  useEffect(() => {
    if(currentId == null) return;
    dispatch(getCategory(currentId));
  }, [currentId])

  useEffect(() => {
    if(editingStatus == null) return;

    if(editingStatus == "success"){
      dispatch({type: endEditing.type});
      dispatch(fetchCategories(currentId));
      message.success("Category updated");
      return;
    }

    if(editingStatus == "error"){
      message.error("Category not changed: " + time);
      return;
    }
  }, [editingStatus])

  function handleOk() {
    form.submit();
  }

  function handleFinish(values) {
    dispatch(updateCategory(currentId, values));
  }

  return (
    <div>
      {/* Modal */}
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={() => dispatch({ type: endEditing.type })}
        okButtonProps={{
          disabled: startEditing === true || editing === true ? true : false,
          loading: startEditing === true || editing === true ? true : false,
        }}
        cancelButtonProps={{
          disabled: startEditing === true || editing === true ? true : false,
          loading: startEditing === true || editing === true ? true : false,
        }}
      >
        {startEditing && <div style={{textAlign: "center"}}><Spin /></div>}
        {currentValues != null && (
          <CategoryForm
            form={form}
            onFinish={handleFinish}
            initialValues={currentValues}
          />
        )}
      </Modal>
    </div>
  );
};

export default CategoryEdit;
