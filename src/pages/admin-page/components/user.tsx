import {
  useCustomers,
  useAddUser,
  useDeleteUser,
  useUpdateUser,
} from "@/pages/app.loader";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Form, Input, Modal, Row, Table } from "antd";
import { useState } from "react";

export const User = () => {
  const { data: dataCustomers } = useCustomers();
  const [optionModal, setOptionModal] = useState("");
  const [visible, setVisible] = useState(false);
  const [idSelected, setIdSelected] = useState("");
  const { mutate: mutateAddUser } = useAddUser();
  const { mutate: mutateUpdateUser } = useUpdateUser();
  const { mutate: mutateDeleteUser } = useDeleteUser();
  const [form] = Form.useForm();
  const showModal = () => {
    setOptionModal("Add");
    setVisible(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState();
  const handleOkDelete = () => {
    mutateDeleteUser(idSelected);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      width: 300,
    },
    {
      title: "User",
      dataIndex: "user",
      width: 300,
    },
    {
      title: "Password",
      dataIndex: "password",
      width: 300,
    },
    {
      title: "Cart",
      dataIndex: "cart",
      width: 600,
      render: (cart: any) => {
        return (
          <div>
            {cart?.data?.map((item: any, index: any) => {
              return (
                <div>
                  <Row>
                    <Col span={14}>
                      <b>
                        {index + 1}. {item.color}{" "}
                      </b>
                    </Col>
                    <Col span={10}>
                      ${item.price} x {item.count}
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Active",
      dataIndex: "active",
      width: 200,
      render: (_: any, data: any) => {
        return (
          <div>
            <EditOutlined
              style={{ paddingRight: 8, color: "blue" }}
              onClick={handleEdit}
            />
            <DeleteOutlined style={{ color: "red" }} onClick={handleDelete} />
          </div>
        );
        function handleEdit() {
          setOptionModal("Edit");
          setVisible(true);
          setIdSelected(data.id);
          form.setFieldsValue(data);
        }
        function handleDelete() {
          setIsModalOpen(true);
          setIdSelected(data.id);
          setUserSelected(data.user);
        }
      },
    },
  ];
  const handleOk = () => {
    // Xử lý khi người dùng ấn OK
    if (optionModal === "Add") {
      form
        .validateFields()
        .then((values) => {
          mutateAddUser(values);
          form.resetFields();
          setVisible(false);
        })
        .catch((errorInfo) => {
          console.log("Validation failed:", errorInfo);
        });
    } else {
      form
        .validateFields()
        .then((values) => {
          var a = { ...values, _id: idSelected };
          mutateUpdateUser(a);
          form.resetFields();
          setVisible(false);
        })
        .catch((errorInfo) => {
          console.log("Validation failed:", errorInfo);
        });
    }
  };

  const handleCancel = () => {
    // Xử lý khi người dùng ấn Hủy
    form.resetFields();
    setVisible(false);
  };
  return (
    <div>
      <Row justify={"space-between"}>
        <Col>
          <h2>Users</h2>
        </Col>
        <Col>
          <Button type="primary" onClick={showModal} style={{ margin: 20 }}>
            Thêm người dùng{" "}
          </Button>
        </Col>
      </Row>
      <Table dataSource={dataCustomers} columns={columns} />;
      <Modal
        title={
          optionModal === "Add" ? "Thêm người dùng" : "Sửa thông tin người dùng"
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[{ required: true, message: "Vui lòng nhập fullname!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User"
            name="user"
            rules={[{ required: true, message: "Vui lòng nhập user!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập password!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xóa người dùng"
        open={isModalOpen}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <Alert
          message={
            <p>
              Bạn có chắc chắn muốn xóa người dùng "<b>{userSelected}</b>"
              không?
            </p>
          }
          type="error"
          showIcon
        />
      </Modal>
    </div>
  );
};
