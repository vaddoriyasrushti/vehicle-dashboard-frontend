import React, { useEffect } from "react";
import "./Header/header.scss";
import { Button, Form, Input, Modal } from "antd";
import { addVehicle, editVehicleByNo } from "./../reducer/vehicle";
import { useDispatch } from "react-redux";

const AddEditModal = ({setIsAddModalOpen, toggleAddVehicleModel, isAddModalOpen, isEdit, selectedVehicle}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if(isEdit) {
      form.setFieldsValue(selectedVehicle)
    }
  },[selectedVehicle])

  const onFinish = async (values) => {
    const onSuccess = (res) => {
      if (res.status === 200) {
        console.log(res);
        setIsAddModalOpen(false);
        form.resetFields();
      } else {
        setIsAddModalOpen(true);
        form.resetFields();
      }
    };
    const onFailure = (res) => {
      console.log(res);
    };
    isEdit ? 
      dispatch(editVehicleByNo(selectedVehicle.no, values, onSuccess, onFailure))
    : dispatch(addVehicle({...values, status: 'Live'}, onSuccess, onFailure));
  };

  const handleMarkAsSold = () => {
    const onSuccess = (res) => {
      if (res.status === 200) {
        console.log(res);
        setIsAddModalOpen(false);
      } else {
        setIsAddModalOpen(true);
      }
    };
    const onFailure = (res) => {
      console.log(res);
    };
    dispatch(editVehicleByNo(selectedVehicle.no, {status: 'Sold'}, onSuccess, onFailure));
  }

  const onCancel = () => {
    toggleAddVehicleModel();
    form.resetFields();
  }
  return (
    <div>
      <Modal 
        title={isEdit ? "Edit Vehicle" : "Add Vehicle" }
        centered 
        onCancel={onCancel} 
        open={isAddModalOpen} 
        footer={false}>
        <Form
          form={form}
          name="Add Vehicle"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Make"
            name="make"
            rules={[
              {
                required: true,
                message: "Please input maker!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={[
              {
                required: true,
                message: "Please input model!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Year"
            name="year"
            rules={[
              {
                required: true,
                message: "Please input Year!",
              },
              {
                pattern: RegExp(/^[0-9]+$/),
                message: "Enter valid year!",
              },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Price ($)"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price!",
              },
              {
                pattern: RegExp(/^[0-9]+$/),
                message: "Enter valid price!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item >
            <div className="modal-footer">
            {
              isEdit && selectedVehicle.status === 'Live' &&
              <Button style={{marginRight: "10px"}} type="primary" onClick={handleMarkAsSold}>
                Mark as sold
              </Button>
            }
            <Button type="primary" htmlType="submit">
              {isEdit ? 'Update' : 'Submit'}
            </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddEditModal;
