import {
  useAddProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/pages/app.loader";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useState } from "react";
import { useProductItems } from "../product.loader";

export const Product = () => {
  const { data: dataProducts } = useProductItems({
    option: "All",
  });
  const { mutate: mutateAddProduct } = useAddProduct();
  const { mutate: mutateUpdateProduct } = useUpdateProduct();
  const { mutate: mutateDeleteProduct } = useDeleteProduct();
  const [optionModal, setOptionModal] = useState("");
  const [idSelected, setIdSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState();
  const handleOkDelete = () => {
    mutateDeleteProduct(idSelected);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      width: 300,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 300,
    },
    {
      title: "Summary",
      dataIndex: "summary",
      width: 300,
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      width: 300,
    },
    {
      title: "provider",
      dataIndex: "provider",
      width: 300,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      width: 300,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 500,
    },
    {
      title: "Added Date",
      dataIndex: "addedDate",
      width: 300,
    },
    {
      title: "Inventory",
      dataIndex: "inStock",
      width: 300,
    },
    {
      title: "Active",
      dataIndex: "active",
      width: 300,
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
          setIdSelected(data._id);
          form.setFieldsValue(data);
        }
        function handleDelete() {
          setIdSelected(data._id);
          setIsModalOpen(true);
          setUserSelected(data.color);
        }
      },
    },
  ];
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setOptionModal("Add");
    setVisible(true);
  };

  const handleOk = () => {
    // Xử lý khi người dùng ấn OK
    if (optionModal === "Add") {
      form
        .validateFields()
        .then((values) => {
          values.id = "123";
          console.log(values);
          mutateAddProduct(values);
          form.resetFields();
          setVisible(false);
        })
        .catch((errorInfo) => {
          console.log("Validation failed:", errorInfo);
        });
    } else {
      console.log(form.getFieldsValue());
      form
        .validateFields()
        .then((values) => {
          var a = { ...values, _id: idSelected };
          mutateUpdateProduct(a);
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
  const { Option } = Select;
  return (
    <div>
      <Row justify={"space-between"}>
        <Col>
          <h2>Product</h2>
        </Col>
        <Col>
          <Button type="primary" onClick={showModal} style={{ margin: 20 }}>
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>
      <Table dataSource={dataProducts} columns={columns} />;
      <Modal
        title={optionModal === "Add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
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
            label="Name"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập name!" }]}
          >
            <Select placeholder="Chọn sản phẩm">
              <Option value="Bathroom">Bathroom</Option>
              <Option value="Bedroom">Bedroom</Option>
              <Option value="Cabinet">Cabinet</Option>
              <Option value="Chair">Chair</Option>
              <Option value="Home Office">Home Office</Option>
              <Option value="Living Room">Living Room</Option>
              <Option value="Sofa">Sofa</Option>
              <Option value="Kitchen">Kitchen</Option>
              <Option value="Stool">Stool</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="color"
            rules={[{ required: true, message: "Vui lòng nhập description!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Vui lòng nhập price!" },
              { type: "string", message: "Vui lòng nhập price!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Url Image"
            name="urlImg"
            rules={[{ required: true, message: "Vui lòng nhập url image!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xóa sản phẩm"
        open={isModalOpen}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <Alert
          message={
            <p>
              Bạn có chắc chắn muốn xóa sản phẩm "<b>{userSelected}</b>" không?
            </p>
          }
          type="error"
          showIcon
        />
      </Modal>
    </div>
  );
};
